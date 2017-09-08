using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using DNX.ProductDetail.API.Models;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Swashbuckle.AspNetCore.Swagger;

namespace DNX.ProductDetail.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IContainer container { get; private set; }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddCors(o => o.AddPolicy("DnxPolicy", b =>
            {
                //builder.WithOrigins("http://localhost:5002");
                b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            }));
            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("DnxPolicy"));
            });

            var builder = new ContainerBuilder();
            builder.Register(c =>
                {
                    return Bus.Factory.CreateUsingRabbitMq(sbc =>
                        sbc.Host(new Uri("rabbitmq://localhost:5672/"), h =>
                        {
                            h.Username("guest");
                            h.Password("guest");
                        })
                    );
                })
                .As<IBusControl>()
                .As<IPublishEndpoint>()
                .SingleInstance();


            var connectionString = Configuration.GetConnectionString("DNXDatabaseOnAzure"); 
            services.AddDbContext<DnxContext>(opts => opts.UseSqlServer(connectionString));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "ProductDetail API", Version = "v1" });

                c.AddSecurityDefinition("oauth2", new OAuth2Scheme
                {
                    Type = "oauth2",
                    Flow = "implicit",
                    AuthorizationUrl = "http://localhost:5000/connect/authorize",
                    Scopes = new Dictionary<string, string>
                    {
                        { "productdetail", "ProductDetail API" }
                    },
                    TokenUrl = "http://localhost:5000/token"
                });
            });

            builder.Populate(services);
            container = builder.Build();
            // Create the IServiceProvider based on the container.
            return new AutofacServiceProvider(container);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors("DnxPolicy");

            app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
            {
                Authority = "http://localhost:5000",
                RequireHttpsMetadata = false,
                ApiName = "productdetail",
                ApiSecret = "productdetail-secret",
                AllowedScopes = { "productdetail", "openid", "email", "profile" },
                //ClaimsIssuer = "http://localhost:5000",
                //AutomaticAuthenticate = true

            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProductDetail API V1");
                c.ConfigureOAuth2("productdetail-swagger", "productdetail-secret", "swagger-realm", "Swagger", "productdetail");
            });

            app.UseMvc();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler();
            }

        }

    }
}

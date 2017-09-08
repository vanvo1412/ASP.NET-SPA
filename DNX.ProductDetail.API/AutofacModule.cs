using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using DNX.ProductDetail.API.Consumers;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace DNX.ProductDetail.API
{
    public class AutofacModule: Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // The generic ILogger<TCategoryName> service was added to the ServiceCollection by ASP.NET Core.
            // It was then registered with Autofac using the Populate method in ConfigureServices.
            //builder.Register(c => new ValuesService(c.Resolve<ILogger<ValuesService>>()))
            //    .As<IValuesService>()
            //    .InstancePerLifetimeScope();

            builder.Register(c =>
            {
                return Bus.Factory.CreateUsingRabbitMq(sbc =>
                    {
                        var host = sbc.Host(new Uri("rabbitmq://localhost:5672/"), h =>
                        {
                            h.Username("guest");
                            h.Password("guest");
                        });
                        sbc.ReceiveEndpoint(host,"testqueue", e =>
                        {
                            e.Consumer<TestConsumer>();
                        });
                    }
                    
                );
            }).As<IBusControl>().As<IPublishEndpoint>().SingleInstance();
        }
    }
}

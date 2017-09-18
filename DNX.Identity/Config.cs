using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace DNX.Identity
{
    public class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("productdetail", "ProductDetail.API")
            };
        }

        public static IEnumerable<Client> GetClients(string clientUrl)
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "console",
                    ClientName = "Console ClientCredentials flow",
                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    // scopes that client has access to
                    AllowedScopes = {"productdetail"}
                },
                new Client
                {
                    ClientId = "spa",
                    ClientName = "Angular Implicit flow",
                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,

                    // where to redirect to after login
                    RedirectUris = { "http://localhost:5002/signin-callback.html" },
                    // where to redirect to after logout
                    PostLogoutRedirectUris = { "http://localhost:5002/silent-renew-callback.html" },
                    AllowedCorsOrigins = {"http://localhost:5002"},

                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    // scopes that client has access to
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "productdetail"
                    }
                },
                new Client
                {
                    ClientId = "spa-ro",
                    ClientName = "Angular ResourceOwner flow",
                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,
                    // where to redirect to after login
                    RedirectUris = { "http://localhost:5002/signin-callback.html" },

                    // where to redirect to after logout
                    PostLogoutRedirectUris = { "http://localhost:5002/silent-renew-callback.html" },
                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    // scopes that client has access to
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "productdetail"
                    },
                    AllowedCorsOrigins = {"http://localhost:5002"}
                },
                new Client
                {
                    ClientId = "ro.client",
                    ClientName = "Console ResourceOwner flow",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes = { "productdetail" }
                },
                // OpenID Connect implicit flow client (MVC)
                new Client
                {
                    ClientId = "mvc",
                    ClientName = "MVC Client",
                    AllowedGrantTypes = GrantTypes.Implicit,

                    // where to redirect to after login
                    RedirectUris = { "http://localhost:5002/signin-oidc" },

                    // where to redirect to after logout
                    PostLogoutRedirectUris = { "http://localhost:5002/signout-callback-oidc" },

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile
                    }
                },
                new Client
                {
                    ClientId = "productdetail-swagger",
                    ClientName = "Swagger",
                    ClientSecrets =
                    {
                        new Secret("productdetail-secret".Sha256())
                    },
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,
                    // where to redirect to after login
                    RedirectUris = { "http://localhost:5001/swagger/o2c.html" },

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "productdetail"
                    }
                }
            };
        }

        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "alice",
                    Password = "password"
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "bob",
                    Password = "password"
                }
            };
        }
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }
    }
}
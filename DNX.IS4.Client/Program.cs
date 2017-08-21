using IdentityModel.Client;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace DNX.IS4.Client
{
    class Program
    {
        static void Main(string[] args)
        {
            Task.Run(async () =>
            {
                // discover endpoints from metadata
                var disco = await DiscoveryClient.GetAsync("http://localhost:5000");

                // request token
//                var tokenClient = new TokenClient(disco.TokenEndpoint, "console", "secret");
//                var tokenResponse = await tokenClient.RequestClientCredentialsAsync("productdetail");
//
//                if (tokenResponse.IsError)
//                {
//                    Console.WriteLine(tokenResponse.Error);
//                    return;
//                }
//
//                Console.WriteLine(tokenResponse.Json);

                // request token
                var tokenClient = new TokenClient(disco.TokenEndpoint, "ro.client", "secret");
                var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync("alice", "password", "productdetail");

                if (tokenResponse.IsError)
                {
                    Console.WriteLine(tokenResponse.Error);
                    return;
                }

                Console.WriteLine(tokenResponse.Json);
                Console.WriteLine("\n\n");



                // call api
                var client = new HttpClient();
                client.SetBearerToken(tokenResponse.AccessToken);

                var response = await client.GetAsync("http://localhost:5001/identity");
                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine(response.StatusCode);
                }
                else
                {
                    var content = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(JArray.Parse(content));
                }
            }).GetAwaiter().GetResult();
            Console.ReadLine();
        }
    }
}
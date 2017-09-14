using IdentityModel.Client;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace DNX.IS4.Client
{
    class Program
    {
//        static void Main(string[] args)
//        {
//            Task.Run(async () =>
//            {
//                // discover endpoints from metadata
//                var disco = await DiscoveryClient.GetAsync("http://localhost:5000");

//                // request token
////                var tokenClient = new TokenClient(disco.TokenEndpoint, "console", "secret");
////                var tokenResponse = await tokenClient.RequestClientCredentialsAsync("productdetail");
////
////                if (tokenResponse.IsError)
////                {
////                    Console.WriteLine(tokenResponse.Error);
////                    return;
////                }
////
////                Console.WriteLine(tokenResponse.Json);

//                // request token
//                var tokenClient = new TokenClient(disco.TokenEndpoint, "ro.client", "secret");
//                var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync("alice", "password", "productdetail");

//                if (tokenResponse.IsError)
//                {
//                    Console.WriteLine(tokenResponse.Error);
//                    return;
//                }

//                Console.WriteLine(tokenResponse.Json);
//                Console.WriteLine("\n\n");



//                // call api
//                var client = new HttpClient();
//                client.SetBearerToken(tokenResponse.AccessToken);

//                var response = await client.GetAsync("http://localhost:5001/identity");
//                if (!response.IsSuccessStatusCode)
//                {
//                    Console.WriteLine(response.StatusCode);
//                }
//                else
//                {
//                    var content = await response.Content.ReadAsStringAsync();
//                    Console.WriteLine(JArray.Parse(content));
//                }
//            }).GetAwaiter().GetResult();
//            Console.ReadLine();
//        }

        static void Main(string[] args)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "hello",
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null);

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body;
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine(" [x] Received {0}", message);
                };
                channel.BasicConsume(queue: "hello",
                    autoAck: true,
                    consumer: consumer);

                Console.WriteLine(" Press [enter] to exit.");
                Console.ReadLine();
            }
        }
    }
}
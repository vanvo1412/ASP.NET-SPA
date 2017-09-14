using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DNX.ProductDetail.API.Contracts;
using MassTransit;

namespace DNX.ProductDetail.API.Consumers
{
    public class TestConsumer: IConsumer<TestContract>
    {
        public Task Consume(ConsumeContext<TestContract> context)
        {
            System.Diagnostics.Debug.WriteLine($"Adding user {context.Message.Description} {context.Message.Guid}");
            return Task.CompletedTask;
        }
    }
}

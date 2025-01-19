import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class IngestionService {
  private client = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // RabbitMQ URL
      queue: 'ingestion_queue',
      queueOptions: { durable: false },
    },
  });

  triggerIngestion(data: any) {
    return this.client.emit('ingestion_trigger', data);
  }
}

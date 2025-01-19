import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

  onModuleInit() {
    this.client.connect();
  }

  async sendMessage(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
}

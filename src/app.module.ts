import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydatabase',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Auto-sync schema with database (disable in production)
    }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'main_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    AuthModule,
    UsersModule,
    DocumentsModule,
    IngestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService, ClientsModule],
})
export class AppModule {}

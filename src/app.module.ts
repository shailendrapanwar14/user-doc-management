import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [AuthModule, UsersModule, DocumentsModule, IngestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

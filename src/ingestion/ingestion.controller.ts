import { Controller, Post, Get, Param } from '@nestjs/common';
import { IngestionService } from '../ingestion/ingestion.service';
import axios from 'axios';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}
  private ingestionProcesses = new Map<string, string>(); // Mock ingestion status

  @Post('trigger')
  async triggerIngestion() {
    try {
      const response = await axios.post('http://python-backend-url/ingest', {
        data: { /* your payload */ },
      });
      return this.ingestionService.triggerIngestion({ data: 'example_payload' });
      //return { message: 'Ingestion triggered successfully', data: response.data };
    } catch (error) {
      return { message: 'Failed to trigger ingestion', error: error.message };
    }
  }

  @Get(':id/status')
  checkStatus(@Param('id') id: string) {
    const status = this.ingestionProcesses.get(id) || 'Not Found';
    return { processId: id, status };
  }
}

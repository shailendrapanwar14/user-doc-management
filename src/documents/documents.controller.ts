import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Get, Delete } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() metadata: { title: string; description: string },
  ) {
    return this.documentsService.create({
      title: metadata.title,
      description: metadata.description,
      filePath: file.path,
      uploadedBy: 'admin', // Replace with actual user
    });
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.documentsService.delete(id);
  }
}

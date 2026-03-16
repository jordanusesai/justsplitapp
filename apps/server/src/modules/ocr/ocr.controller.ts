import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OCRService } from './ocr.service';
import { OCRResult } from '@justsplitapp/types';

@Controller('ocr')
export class OCRController {
  constructor(private readonly ocrService: OCRService) {}

  @Post('scan')
  @UseInterceptors(FileInterceptor('receipt'))
  async scanReceipt(@UploadedFile() file: Express.Multer.File): Promise<OCRResult> {
    if (!file) {
      throw new HttpException('No receipt file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.ocrService.parseReceipt(file);
    } catch (error) {
      throw new HttpException('Failed to parse receipt', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

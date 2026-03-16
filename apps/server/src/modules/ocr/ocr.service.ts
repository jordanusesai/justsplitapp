import { Injectable, Logger } from '@nestjs/common';
import { OCRResult } from '@justsplitapp/types';

@Injectable()
export class OCRService {
  private readonly logger = new Logger(OCRService.name);

  async parseReceipt(file: Express.Multer.File): Promise<OCRResult> {
    this.logger.log(`Parsing receipt: ${file.originalname} (${file.size} bytes)`);
    
    // MOCK OCR Logic as per UI Prompt.txt
    // In a real scenario, this would call Tesseract or a cloud provider
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          merchant: 'Whole Foods Market',
          date: new Date().toISOString(),
          total: 42.50,
          tax: 3.50,
          confidence: 0.95,
          isMock: true,
          items: [
            { description: 'Organic Milk', amount: 5.99, quantity: 1 },
            { description: 'Avocados (3ct)', amount: 4.50, quantity: 1 },
            { description: 'Whole Wheat Bread', amount: 3.99, quantity: 1 },
            { description: 'Chicken Breast', amount: 12.50, quantity: 1 },
            { description: 'Sparkling Water (12pk)', amount: 12.02, quantity: 1 },
          ],
        });
      }, 1500); // Simulate processing delay
    });
  }
}

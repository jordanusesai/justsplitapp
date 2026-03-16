import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private readonly uploadDir: string;

  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get<string>('STORAGE_BUCKET_LOCAL') || './storage';
  }

  onModuleInit() {
    this.ensureDirectoryExists(this.uploadDir);
  }

  private ensureDirectoryExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      this.logger.log(`Created storage directory: ${dir}`);
    }
  }

  async saveFile(fileName: string, buffer: Buffer): Promise<string> {
    const filePath = path.join(this.uploadDir, fileName);
    this.ensureDirectoryExists(path.dirname(filePath));
    
    await fs.promises.writeFile(filePath, buffer);
    this.logger.log(`File saved: ${filePath}`);
    
    return filePath;
  }

  async getFile(fileName: string): Promise<Buffer> {
    const filePath = path.join(this.uploadDir, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${fileName}`);
    }
    return fs.promises.readFile(filePath);
  }

  async deleteFile(fileName: string): Promise<void> {
    const filePath = path.join(this.uploadDir, fileName);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      this.logger.log(`File deleted: ${filePath}`);
    }
  }
}

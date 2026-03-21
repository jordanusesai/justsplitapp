import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import helmet from 'helmet'
import cors from 'cors'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.use(helmet())
  app.use(cors({
    origin: configService.get<string>('CORS_ORIGIN') || ['http://localhost:5173', 'http://localhost:19006'],
    credentials: true,
  }))

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  app.useWebSocketAdapter(new IoAdapter(app))

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('JustSplit API')
    .setDescription('The JustSplit expense sharing API description')
    .setVersion('1.0')
    .addTag('splits')
    .addTag('users')
    .addTag('auth')
    .addTag('ocr')
    .addTag('currency')
    .addTag('places')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  const port = configService.get<number>('PORT') || 4000
  await app.listen(port, '0.0.0.0')
  
  console.log(`🚀 Server running on http://localhost:${port}`)
  console.log(`📖 Documentation available at http://localhost:${port}/api/docs`)
}

bootstrap()

// src/main.ts
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   // Render uses the PORT env var; 10000 is their default
//   await app.listen(process.env.PORT || 10000, '0.0.0.0'); 
// }
// bootstrap();
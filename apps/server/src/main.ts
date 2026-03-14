import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IoAdapter } from '@nestjs/platform-socket.io'
import helmet from 'helmet'
import * as cors from 'cors'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.use(helmet())
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:19006'],
    credentials: true,
  }))

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  app.useWebSocketAdapter(new IoAdapter(app))

  const port = configService.get<number>('PORT') || 4000
  await app.listen(port)
  
  console.log(`🚀 Server running on http://localhost:${port}`)
}

bootstrap()

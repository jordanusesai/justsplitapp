import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FeatureFlagsModule } from './modules/feature-flags/feature-flags.module'
import { SplitsModule } from './modules/splits/splits.module'
import { UsersModule } from './modules/users/users.module'
import { WebSocketsModule } from './modules/websockets/websockets.module'
import { OCRModule } from './modules/ocr/ocr.module'
import { CurrencyModule } from './modules/currency/currency.module'
import { PlacesModule } from './modules/places/places.module'
import { ChatModule } from './modules/chat/chat.module'
import { AuthModule } from './modules/auth/auth.module'
import { StorageModule } from './modules/storage/storage.module'
import { GroupsModule } from './modules/groups/groups.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/justsplitapp'),
    FeatureFlagsModule,
    SplitsModule,
    UsersModule,
    WebSocketsModule,
    OCRModule,
    CurrencyModule,
    PlacesModule,
    ChatModule,
    AuthModule,
    StorageModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

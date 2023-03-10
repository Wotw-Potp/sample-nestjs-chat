import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoomModule } from './chat/room.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, RoomModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

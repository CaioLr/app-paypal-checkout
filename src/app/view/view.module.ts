import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ViewController } from './view.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    })
  ],
  controllers: [ViewController]
})
export class ViewModule {}

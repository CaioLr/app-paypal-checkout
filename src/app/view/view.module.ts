import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [ItemsModule],
  controllers: [ViewController],
})
export class ViewModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ViewModule } from './view/view.module';
import { ApiModule } from './api/api.module';

@Module({
    imports: [
        ApiModule,
        ViewModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        })
      ],
})
export class AppModule {}

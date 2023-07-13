import { NestFactory } from '@nestjs/core';
import { ViewModule } from './app/view/view.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    ViewModule,
  );

  app.useStaticAssets(join(__dirname, '..', '/src/public'));
  app.setBaseViewsDir(join(__dirname, '..', '/src/views'));
  app.setViewEngine('ejs');

  await app.listen(3000);
}
bootstrap();
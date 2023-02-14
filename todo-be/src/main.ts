import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors : {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }});
  /* Every endpoint begins with /api */
  app.setGlobalPrefix("api");
  /* Use helmet for common http threat protection */
  app.use(helmet())
  await app.listen(3000);
}
bootstrap();

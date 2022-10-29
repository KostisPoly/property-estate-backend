import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';

//Configuration nest js mismatch cookie-session 
const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieSession({
    keys: [process.env.COOKIE_KEY]
  }))

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true //Strip extra properties outside Dtos
    })
  )
  await app.listen(3000);
}
bootstrap();

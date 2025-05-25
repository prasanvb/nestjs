import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  /* Create new application instance */
  const app = await NestFactory.create(MessagesModule);

  /* Adding pipes to the global app instance */
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((e) => console.error(e));

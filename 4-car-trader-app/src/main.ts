import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setUpMiddlewares } from "./middlewares";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setUpMiddlewares(app);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { setUpMiddlewares } from "./middlewares";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* 
    NOTE: Approach similar to express middlewares. 
    Nestjs recommended approach is to move these setup inside the app module.
  */
  // setUpMiddlewares(app);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

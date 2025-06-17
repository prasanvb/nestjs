import { NestFactory } from "@nestjs/core";
import { AppModule, inputBodyValidatorPipe } from "./app.module";
import { INestApplication } from "@nestjs/common";
import { cookieSessionMiddleware } from "./middleware/cookieSessionMiddleware";

/* 
    NOTE: Approach similar to express middlewares. Code not in use.
    Nestjs recommended approach is to move these setup inside the app module.
*/
export const setUpMiddlewares = (app: INestApplication<any>) => {
  app.use(cookieSessionMiddleware); // Middleware 1
  app.useGlobalPipes(inputBodyValidatorPipe); // Middleware 2
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* 
    NOTE: Approach similar to express middlewares. Code not in use.
    Nestjs recommended approach is to move these setup inside the app module.
  */
  // setUpMiddlewares(app);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

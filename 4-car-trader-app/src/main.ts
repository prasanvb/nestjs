import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

var cookieSession = require("cookie-session");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      name: "session",
      keys: ["secret-nestjs-prasan"],
      // Cookie Options
      maxAge: 60 * 60 * 1000, // 1 hour
    })
  );
  // whitelist ValidatorOptions if set to true validator will strip validated object of any properties that do not have any decorators.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

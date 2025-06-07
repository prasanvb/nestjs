import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
const cookieSession = require("cookie-session");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    cookieSession({
      name: "session",
      keys: ["secret-nestjs-prasan"],
      // Cookie Options
      maxAge: 60 * 60 * 1000, // 1 hour
    } as CookieSessionInterfaces.CookieSessionOptions)
  );
  // whitelist ValidatorOptions if set to true validator will strip validated object of any properties that do not have any decorators.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

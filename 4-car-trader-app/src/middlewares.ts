import { INestApplication, ValidationPipe } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
const cookieSession = require("cookie-session");

export const pipeSetUp = new ValidationPipe({
  // whitelist ValidatorOptions if set to true validator will strip validated object of any properties that do not have any decorators.
  whitelist: true,
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const cookieSessionSetup = cookieSession({
  name: "session",
  keys: ["secret-nestjs-prasan"],
  // Cookie Options
  maxAge: 60 * 60 * 1000, // 1 hour
} as CookieSessionInterfaces.CookieSessionOptions);

/* 
    NOTE: Approach similar to express middlewares. 
    Nestjs recommended approach is to move these setup inside the app module.
*/
export const setUpMiddlewares = (app: INestApplication<any>) => {
  app.use(cookieSessionSetup);
  app.useGlobalPipes(pipeSetUp);
};

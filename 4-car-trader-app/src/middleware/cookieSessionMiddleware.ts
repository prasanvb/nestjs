// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
const cookieSession = require("cookie-session");

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const cookieSessionMiddleware = cookieSession({
  name: "session",
  keys: ["secret-nestjs-prasan"],
  // Cookie Options
  maxAge: 60 * 60 * 1000, // 1 hour
} as CookieSessionInterfaces.CookieSessionOptions);

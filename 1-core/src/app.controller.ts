import { Controller, Get } from "@nestjs/common";

@Controller("app")
export class AppController {
  /* http://localhost:3030/app */
  @Get()
  getRootRoute() {
    return "Welcome to NestJs! ";
  }

  /* http://localhost:3030/app/hi */
  @Get("hi")
  getHiRoute() {
    return "Hi Prasan 🌞";
  }

  /* http://localhost:3030/app/bye */
  @Get("bye")
  getByeRoute() {
    return "Bye Prasan 👋";
  }
}

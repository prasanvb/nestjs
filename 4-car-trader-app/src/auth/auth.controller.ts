import { Controller, Post } from "@nestjs/common";

@Controller("auth")
export class authController {
  
  @Post("signup")
  userSignUp() {
    console.log("user signup");
  }
}

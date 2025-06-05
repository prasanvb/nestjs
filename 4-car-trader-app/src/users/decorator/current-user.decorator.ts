import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/* NOTE: param decorators exists outside the Dependency Injection system, 
         so our decorator can't get an instance of UserService or any other serivce directly */
// Defines HTTP route param decorator with a factory function as input parameter
// data: Input data passed as part of decorator call. example: @CurrentUser('user')
// context: Wrapper around the incoming HTTP request object
export const CurrentUser = createParamDecorator(
  (_data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.session.userId);
    return "hi there";
  }
);

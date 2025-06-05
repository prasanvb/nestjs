import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/* NOTE: Problem: param decorators exists outside the Dependency Injection system, 
         so our decorator can't get an instance of UserService or any other serivce directly
         Solution: Make an interceptor to get the current user using userService, 
         then use the value obtained by it in the decorator */
// Defines HTTP route param decorator with a factory function as input parameter
// data: Input data passed as part of decorator call. example: @CurrentUser('user')
// context: Wrapper around the incoming HTTP request object
export const CurrentUser = createParamDecorator(
  (_data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  }
);

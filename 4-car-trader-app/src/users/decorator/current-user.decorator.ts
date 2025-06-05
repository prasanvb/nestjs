import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// Defines HTTP route param decorator
export const CurrentUser = createParamDecorator((_data: any, _context: ExecutionContext) => {
  return "hi there";
});

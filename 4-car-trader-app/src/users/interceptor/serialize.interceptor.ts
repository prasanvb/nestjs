import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
  new (...args: any[]): object;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

/* 
  Typescript `implements` is used to implement a new class that satisfies all the requirements of the abstract class or interface
 */
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  // context: Wrapper around the incoming HTTP request object
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    // FYI: Code placed here will be executed before the request is handled
    console.log("Executing prior to the route handler being triggered", {
      context,
    });

    return next.handle().pipe(
      // FYI: data is an entity instance
      map((data: any) => {
        // FYI: Code placed here will be executed before the response is sent out
        console.log("Running before the API response is sent", data);
        // NOTE: entity instance is converted to a DTO instance. DTO instance holds all the serialization rules. NestJS takes the DTO instance and converts it to JSON object
        return plainToClass(this.dto, data, {
          // FYI: Indicates if extraneous properties should be excluded from the value when converting a plain value to a class. This option requires that each property on the target class has at least one @Expose or @Exclude decorator assigned from this library.
          excludeExtraneousValues: true,
        });
      })
    );
  }
}

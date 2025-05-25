# NESTJS MESSAGES PROJECT

NOTE: Its common to have similar method names on the service and repositories

- Service is place to put any business logic and uses one or more repositories to find or store data
- Repositories is place to put storage-related logic and usually ends up being a TypeORM entity, a Mongoose schema, or similar
- Dependency injection is all about making use of inversion of control, but not having to create a ton of different classes or a ton of different instances every single time.
- Wire up the different class into the Nest DI container/Injector using the `@Injectable` decorator
- We don’t have to register controllers with the DI container because nestjs automatically creates a instance of the controller in the module

## CLI commands

- `nest new my-nest-project` creates a new project
- `nest generate module messages` - creates a new module with name messages
- `nest generate controller messages/messages --flat` - created a new controller called messages within messages folder
  - `--flat` - avoids creating extra folders for controllers

## Decorators to access HTTP request data

- `@Headers()` - used to access the request header
- `@Body()` - used to access the request body
- `@Param('id')` - used to access url parameters
- `@Query()` - used to access query string

## Data Validation

- `pipes` - validates data before it reaches a route handler
  - Nest comes with several pipes available out-of-the-box: ValidationPipe, ParseIntPipe, ParseFloatPipe, ParseBoolPipe, ParseArrayPipe, ParseUUIDPipe, ParseEnumPipe, DefaultValuePipe, ParseFilePipe, ParseDatePipe
  - Custom pipes can also built manual
  - `ValidationPipe` - built nestJs pipe to make data validation
  - `app.useGlobalPipes(new ValidationPipe())` - add validation pipes at global level to the app instance

## Data Transfer Object [DTO](src/messages/dto/create-message.dto.ts)

- DTO class that describes the different properties that the request body must have
- Add validation decorators to the DTO class properties using the class-validator package
- DTO class with validation rules is applied to the request body in the route method
- Under the hood DTO use [class-transformer](https://www.npmjs.com/package/class-transformer/) and [class-validator](https://www.npmjs.com/package/class-validator) for data validation
  - Use class-transformer to turn the body into an instance of the DTO class
  - Use class-validator to validate the instance

## NestJS Built in [HTTPExceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)

# NestJS Messages Project

**Note:** It is common to have similar method names in both the service and repositories.

- **Service:** This is where you should place any business logic. Services typically utilize one or more repositories to find or store data.
- **Repository:** Repositories contain storage-related logic and usually end up being a TypeORM entity, a Mongoose schema, or something similar.
- **Dependency Injection:** This concept is centered around the idea of Inversion of Control, allowing you to avoid creating numerous classes or instances each time.
- **Injectable Decorator:** Use the `@Injectable` decorator to wire different classes into the Nest Dependency Injection (DI) container.
- **Controllers:** You do not need to register controllers with the DI container, as NestJS automatically creates instances of controllers within the module.

## CLI Commands

- `nest new my-nest-project`: Creates a new NestJS project.
- `nest generate module messages`: Generates a new module named "messages."
- `nest generate controller messages/messages --flat`: Creates a new controller called "messages" within the messages folder.
  - The `--flat` option prevents the creation of additional folders for controllers.

## Decorators to Access HTTP Request Data

- `@Headers()`: Used to access the request headers.
- `@Body()`: Used to access the request body.
- `@Param('id')`: Used to access URL parameters.
- `@Query()`: Used to access the query string.

## Data Validation

- **Pipes:** These are used to validate data before it reaches a route handler.
  - NestJS comes with several built-in pipes, including: `ValidationPipe`, `ParseIntPipe`, `ParseFloatPipe`, `ParseBoolPipe`, `ParseArrayPipe`, `ParseUUIDPipe`, `ParseEnumPipe`, `DefaultValuePipe`, `ParseFilePipe`, and `ParseDatePipe`.
  - You can also create custom pipes manually.
  - The `ValidationPipe` is a built-in NestJS pipe used for data validation.
  - To add validation pipes at the global level to the app instance, use: `app.useGlobalPipes(new ValidationPipe()).`

## Data Transfer Object ([DTO](src/messages/dto/create-message.dto.ts))

- A DTO is a class that defines the properties required in the request body and response object. Dto's don't hold any business logic.

  - Serialization transforms an object's data into a stream of bytes, making it suitable for storage in files, transmission over networks, or persistence in databases.
  - Deserialization takes the serialized data (e.g., a stream of bytes or a JSON string) and reconstructs the original object or data structure.

- Add validation decorators (example: `@IsString()`) to the properties of the DTO class using the `class-validator` package.
- The [DTO class](src/messages/messages.controller.ts), along with its validation rules, is applied to the request body in the route method.
- Under the hood, DTOs utilize [class-transformer](https://www.npmjs.com/package/class-transformer/) and [class-validator](https://www.npmjs.com/package/class-validator) for data validation:
  - `class-transformer` converts the body into an instance of the DTO class.
  - `class-validator` is used to validate that instance.

### Built-in [HTTP Exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions) in NestJS

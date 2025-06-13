# NESTJS

## About NestJS

- NestJS comes with battery included parts for each server operations

  - Modules - Grouping of code belonging to a single business feature
  - Controllers - Handling HTTP req/res
  - services - Handling data access and business logic
  - Pipes - Validates incoming data
  - Filters - Handles errors that occur during request handling
  - Guards - Handles authentication of routes and services
  - Interceptors - Adds additional logic to incoming request or outgoing response
  - Repositories - Handles data stored in a DB

**Note:** 

- It is common to have similar method names in both the service and repositories.

## <ins>**Nestjs Projects**</ins>

- [1-core](1-core/README.md)
- [2-message-book-app](2-message-book-app/README.md)
- [3-dependency-injection-indepth](3-dependency-injection-indepth/README.md)
- [4-car-trader-app](4-car-trader-app/README.md)


## 1. Core

### Getting project running

- Initiate NPM and Install dependencies `npm install @nestjs/common@7.6.17 @nestjs/core@7.6.17 @nestjs/platform-express@7.6.17 reflect-metadata@0.1.13 typescript@4.3.2`
- Set up `tsconfig.json`
- Run `npx ts-node-dev src/main.ts` to execute

### Dependencies and their functions

- `@nestjs/common`- Contains vast majority of functions, classes, etc, that we need from feature development
- `@nestjs/core` - Core Nest factory functions, application level pipes & interceptors
- `@nestjs/platform-express` - Nest use Express JS for handling HTTP requests (default). Instead we can also use Fastify
- `reflect-metadata` - Helps make decorators work

### NestJs Naming convention

- One class per file (some exceptions)
- Class names should include the kind of thing we are creating
- Name of class and name of the file should always match up
- Filename template: name.type_of_thing.ts - `app.modules.ts`, `app.controller.ts`


## 2. Message book app

### Workings 

- **Controllers:** You do not need to register controllers with the DI container, as NestJS automatically creates instances of controllers within the module.
- **Service:** This is where you should place any business logic. Services typically utilize one or more repositories to find or store data.
- **Repository:** Repositories contain storage-related logic and usually end up being a TypeORM entity, a Mongoose schema, or something similar.
- **Dependency Injection:** This concept is centered around the idea of Inversion of Control, allowing you to avoid creating numerous classes or instances each time.
- **Injectable Decorator:** Use the `@Injectable` decorator to wire different classes into the Nest Dependency Injection (DI) container.

### CLI commands used

- `nest new my-nest-project`: Creates a new NestJS project.
- `nest generate module messages`: Generates a new module named "messages."
- `nest generate controller messages/messages --flat`: Creates a new controller called "messages" within the messages folder.
  - The `--flat` option prevents the creation of additional folders for controllers.

### HTTP request/response

#### Decorators to access HTTP request info

- `@Headers()`: Used to access the request headers.
- `@Body()`: Used to access the request body.
- `@Param('id')`: Used to access URL parameters.
- `@Query()`: Used to access the query string.

#### Built-in [HTTP Exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions) in NestJS

### Data Validation

- **Pipes:** These are used to validate data before it reaches a route handler.
  - NestJS comes with several built-in pipes, including: `ValidationPipe`, `ParseIntPipe`, `ParseFloatPipe`, `ParseBoolPipe`, `ParseArrayPipe`, `ParseUUIDPipe`, `ParseEnumPipe`, `DefaultValuePipe`, `ParseFilePipe`, and `ParseDatePipe`.
  - You can also create custom pipes manually.
  - The `ValidationPipe` is a built-in NestJS pipe used for data validation.
  - To add validation pipes at the global level to the app instance, use: `app.useGlobalPipes(new ValidationPipe()).`

### Data Transfer Object ([DTO](2-message-book-app/src/messages/dto/create-message.dto.ts))

- A DTO is a class that defines the properties required in the request body and response object. Dto's don't hold any business logic.

  - Serialization transforms an object's data into a stream of bytes, making it suitable for storage in files, transmission over networks, or persistence in databases.
  - Deserialization takes the serialized data (e.g., a stream of bytes or a JSON string) and reconstructs the original object or data structure.

- Add validation decorators (example: `@IsString()`) to the properties of the DTO class using the `class-validator` package.
- The [DTO class](2-message-book-app/src/messages/messages.controller.ts), along with its validation rules, is applied to the request body in the route method.
- Under the hood, DTOs utilize [class-transformer](https://www.npmjs.com/package/class-transformer/) and [class-validator](https://www.npmjs.com/package/class-validator) for data validation:
  - `class-transformer` converts the body into an instance of the DTO class.
  - `class-validator` is used to validate that instance.


## 3. Dependency injection in-depth

### Workings

- `nest generate module computer` - generates a module with name computer
- `nest generate service cpu` - generates a service with name cpu
  - NOTE: `@Injectable()` decorator is added by default to the service generated by CLI cmd
- `nest generate controller computer` - generates a controller with name computer
  NOTE: If a module name already exists with same name as the service or controller, then the service or controller will be created inside the module.

### Dependency Injection

- Dependency injection is all about making use of inversion of control, but not having to create a ton of different classes or a ton of different instances every single time. Wire up the different class into the Nest DI container/Injector using the @Injectable decorator
- DI container/Injector flow
  - At startup, register all classes with the container
  - Container will figure out what each dependency each class has
  - We then ask the container to create an instance of a class for us
  - Container creates all required dependencies and gives us the instance
  - Container will hold onto the created dependency instances and reuse them if needed

### Decorator definitions

- `@Controller()` Decorator that marks a class as a Nest controller that can receive inbound requests and produce
  responses. An HTTP Controller responds to inbound HTTP Requests and produces HTTP Responses.
- `@Injectable()` Decorator that marks a class as a provider. Providers can be injected into other classes via constructor parameter injection using Nest's built-in Dependency Injection (DI) system.
- `@Module()` Decorator that marks a class as a module. Modules are used by Nest to organize the application structure into scopes. Controllers and Providers are scoped by the module they are declared in. Modules and their classes (Controllers and Providers) form a graph that determines how Nest performs Dependency Injection (DI).
  - `imports` array is used to import other modules that this module depends on. Once module is imported all the exported services of the imported module can be used in this module.
  - `exports` list of the subset of providers (i.e. services) that are provided by this module and should be available in other modules which import this module.
  - `controllers` list of controllers defined in this module which have to be instantiated.
  - `providers` list of providers that will be instantiated by the Nest injector and that may be shared at least across this module. You cannot add services from other modules inside the providers.

### Exporting Services between different modules

- By default the services of each module are private, until exported services can't be accessed by other module
- Once services are added exports list, other module first needs to import the module, so it can call imported service inside its classes
- To call imported service methods inside a class, define the constructor with the newly imported service. Now imported service methods can be called inside the class methods

## 4. Car trader app

### Environment variables

- When using `process.env.NODE_ENV` it looks for the env value in the `"start:dev": "NODE_ENV=dev nest start --watch"`
- Create 2 different env files and 2 different db names
  - `.env.dev` => `DB_NAME=db.sqlite`
  - `.env.test` => `DB_NAME=test.sqlite`
- Validation pipe option `whitelist:true` strips in-valid properties from the incoming body object for security

### HTTP Request using REST client vscode extension

- Add REST calls to a `.http` file. Example : [request.http](4-car-trader-app/api)

### RDBMS

- Entity: An entity is a "thing" or "object" in the real world. An entity contains attributes, which describe that entity. So anything about which we store information is called an entity.
- Entity Set: An entity set is a collection of similar types of entities that share the same attributes. For example: All students of a school are an entity set of Student entities.
- Attributes: Each entity has attributes, which are the characteristics or properties that describe the entity.
- Entity Type: A category or class of entities that share the same attributes is referred to as an entity kind.
- Entity Instance: An entity example is a particular instance or character entity within an entity type. Each entity instance has a unique identity, often known as the primary key.

### TypeORM

- `sqlite` is a file based database
- `npm install @nestjs/typeorm typeorm sqlite3`
- `import` the [typeorm module](4-car-trader-app/src/app.module.ts) inside the `@Module()` decorator
- [TypeORM Entity](4-car-trader-app/screenshots/4-TypeORM-entity.png): When using TypeORM, we don't need to manually create repository files as we did in our message book app. Instead, these repositories are created automatically behind the scenes. We won't see any generated files or anything like that; we will simply have classes created for us.

  - Creating an Entity
    - First, create an entity file and define a class within it that contains all the properties for your entity.
      - sample [entity file](4-car-trader-app/src/users/users.entity.ts)
    - Next, link the entity to its parent module to establish a repository.
      - `TypeOrmModule.forFeature([User])` added to imports
    - Finally, connect the entity to the root connection in the app module.

- [TypeORM Repository API](https://typeorm.io/repository-api): Repository is specific to an entity. In other words, each entity will have its own, build-in repository
  - `create()` - Generates new entity instance, but does not store data into the DB
  - `save()` - Adds or updates a record to the DB
  - `find()` - Runs a query and returns a list of entities
  - `findOne()` - Run a query, returning the first record matching the search criteria
  - `remove()` - Remove a record from the DB
    NOTE: Some methods are designed to work on an Entity instance (i.e.entity hooks like AfterInsert, AfterRemove and AfterUpdate are triggered), example: `remove()`, `save()`. Where as some methods just work directly on DB without an entity instance, example: `insert()`, `update()` & `delete()`.
- **Migration** alters the structure of the database and its data. In TypeORM, the `synchronize: true` feature handles migrations automatically, so we don't need to write any explicit migration SQL scripts for the development environment.
  **IMPORTANT:** Never set the `synchronize` flag to `true` in a production environment.

### Interceptors (Middlewares)

- Interceptors can mess around with incoming requests and/or outgoing responses
- We can as many interceptors as we want
- Interceptors can be applied at route level, controller or global
- Code inside the interceptor triggered in 2 occassion
  - Interceptor code executed prior to the route handler being triggered
  - Interceptor code executed before the API response is sent
- Gloablly scoped interceptor can be used aby module or controller or service [example](4-car-trader-app/src/users/users.module.ts)
  - Drawbacks: Since the interceptor is scoped global, there might be some routes which doesn't require them but we still make DB queries

#### Class Serializer Interceptor Approach (Nest recommended)

- NestJS's built-in solution (e.g., `@Exclude`) lacks dynamic control over what fields are serialized.
- Turns the instance of the entity into a plain object based on some rules set in the entity file
- `@UseInterceptors()` Decorator that binds interceptors to the scope of the controller or method, depending on its context.
  - When `@UseInterceptors` is used at the controller level, the interceptor will be applied to every handler (method) in the controller.
  - When `@UseInterceptors` is used at the individual handler level, the interceptor will apply only to that specific method.
  - `@param` a single interceptor instance or class, or a list of interceptor instances or classes.
- `ClassSerializerInterceptor` interceptor uses the powerful class-transformer package to provide a declarative and extensible way of transforming objects. The basic operation it performs is to take the value returned by a method handler and apply the `instanceToPlain()` function from class-transformer. In doing so, it can apply rules expressed by class-transformer decorators (example: `Exclude()`) on an entity/DTO class,
- `Transform()` to transform response object before sending it out. [sample](4-car-trader-app/src/reports/dto/view-reports.dto.ts)

```typescript
@Transform((report: { obj: { user: User } }) => {
    return report.obj.user.id;
  })
```

#### [Custom Interceptor approach using DTO's](4-car-trader-app/src/users/interceptor/serialize.interceptor.ts)

- Create a custom interceptor to handle response transformation
  - Converts the user entity to a plain object.
  - Applies serialization rules defined in custom DTOs (Data Transfer Objects).
- Introduce different DTOs for different route handlers (e.g., AdminUserDTO, PublicUserDTO).

```typescript
class CustomInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {}
}
```

### Cookie-Session

- Incoming Request: Contains a Cookie header with an encrypted string of numbers and letters

Example: HTTP response Header with session cookie

```text
Set-Cookie: session=eyJjb2xvciI6InJlZCJ9; path=/; expires=Thu, 05 Jun 2025 05:18:43 GMT; httponly,session.sig=1C7_KKdtGBqXyOsv5l7NH-q2K9I; path=/; expires=Thu, 05 Jun 2025 05:18:43 GMT; httponly
```

- Decryption: Cookie-session library decodes the encrypted string into a plain JavaScript session object
- Session Access: Route handlers can read from and modify the session object using decorators
- Encryption & Response: Modified session data is re-encrypted and sent back via Set-Cookie header. If the session data does not change then HTTP response header is not updated.

Example Workflow

```text
Request Cookie: "abc123xyz..." (encrypted)
    ↓
Session Object: { color: "red" }
    ↓
Modify in Handler: { color: "blue" }
    ↓
Response Set-Cookie: "def456uvw..." (newly encrypted)
```

### Guards

- Guards prevent access to global/controllers/routes based on specific conditions
  - application-wide, controller-level, or individual handler-level
- `canActivate()` function must be implemented by a guard and return value indicates whether or not the current request is allowed to proceed. Return can be either synchronous (boolean) or asynchronous (Promise or Observable).
- Return truthy values to allow access, falsy values to deny access (i.e. Returns 403 Forbidden)
- `@UseGuards(AuthGuard)` decorator that binds guards to the scope of the controller or method, depending on its context.
- Guards can also be set up globally for all controllers and routes using app.useGlobalGuards()

```typescript
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.session.userId; // Allow if userId exists in session
  }
}
```



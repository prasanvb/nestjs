# NestJS

## About NestJS

NestJS comes with batteries included for all server operations:

- **Modules** - Group code belonging to a single business feature
- **Controllers** - Handle HTTP requests/responses
- **Services** - Handle data access and business logic
- **Pipes** - Validate incoming data
- **Filters** - Handle errors that occur during request processing
- **Guards** - Handle authentication of routes and services
- **Interceptors** - Add additional logic to incoming requests or outgoing responses
- **Repositories** - Handle data stored in a database

**Note:**

- It is common to have similar method names in both services and repositories.

## NestJS Projects

## [1. Core](1-core/src)

### Getting Started

1. **Initialize NPM and install dependencies:**

   ```bash
   npm install @nestjs/common@7.6.17 @nestjs/core@7.6.17 @nestjs/platform-express@7.6.17 reflect-metadata@0.1.13 typescript@4.3.2
   ```

2. **Set up TypeScript configuration** (`tsconfig.json`)
3. **Run the application:**

   ```bash
   npx ts-node-dev src/main.ts
   ```

### Dependencies and Their Functions

- **`@nestjs/common`** - Contains the vast majority of functions, classes, and utilities needed for feature development
- **`@nestjs/core`** - Provides core Nest factory functions and application-level pipes and interceptors
- **`@nestjs/platform-express`** - Enables NestJS to use Express.js for handling HTTP requests (default). Alternatively, you can use Fastify
- **`reflect-metadata`** - Enables decorator functionality in TypeScript

### NestJS Naming Conventions

- **One class per file** (with some exceptions)
- **Class names** should clearly indicate the type of component being created
- **File names** must match their corresponding class names
- **File naming template:** `name.type_of_thing.ts`
  - Examples: `app.module.ts`, `app.controller.ts`

## [2. Message Book App](2-message-book-app/src)

### Core Concepts

- **Controllers** - You do not need to register controllers with the DI container, as NestJS automatically creates instances of controllers within the module
- **Services** - This is where you should place any business logic. Services typically utilize one or more repositories to find or store data
- **Repositories** - Contain storage-related logic and usually end up being a TypeORM entity, Mongoose schema, or similar
- **Dependency Injection** - This concept is centered around the idea of Inversion of Control, allowing you to avoid creating numerous classes or instances each time
- **Injectable Decorator** - Use the `@Injectable` decorator to wire different classes into the NestJS Dependency Injection (DI) container

### CLI Commands

```bash
# Create a new NestJS project
nest new my-nest-project

# Generate a new module
nest generate module messages

# Generate a controller (without creating additional folders)
nest generate controller messages/messages --flat
```

### HTTP Request/Response Handling

#### Decorators for Accessing HTTP Request Data

- `@Headers()` - Access request headers
- `@Body()` - Access request body
- `@Param('id')` - Access URL parameters
- `@Query()` - Access query string parameters

#### Built-in HTTP Exceptions

For comprehensive documentation on NestJS built-in HTTP exceptions, see: [HTTP Exceptions Documentation](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)

### Data Validation

**Pipes** are used to validate and transform data before it reaches a route handler:

- **Built-in Pipes** - NestJS provides several built-in pipes:

  - `ValidationPipe`, `ParseIntPipe`, `ParseFloatPipe`, `ParseBoolPipe`
  - `ParseArrayPipe`, `ParseUUIDPipe`, `ParseEnumPipe`, `DefaultValuePipe`
  - `ParseFilePipe`, `ParseDatePipe`

- **Custom Pipes** - You can also create custom pipes manually

- **Global Validation** - To add validation pipes globally:

  ```typescript
  app.useGlobalPipes(new ValidationPipe());
  ```

<<<<<<< Updated upstream
[Custom Dependency Injection Example](1-core/customDependencyInjection.ts)

### Workings
=======
### Data Transfer Objects (DTOs)
>>>>>>> Stashed changes

A DTO is a class that defines the structure of data for requests and responses. DTOs do not contain business logic.

**Serialization vs Deserialization:**

- **Serialization** - Transforms an object's data into a format suitable for storage or transmission
- **Deserialization** - Reconstructs the original object from serialized data

**Implementation:**

1. Add validation decorators (e.g., `@IsString()`) to DTO properties using the `class-validator` package
2. Apply the DTO class with validation rules to request bodies in route methods
3. Under the hood, DTOs use:
   - `class-transformer` - Converts request body into a DTO instance
   - `class-validator` - Validates the DTO instance

**Example DTO:** [create-message.dto.ts](2-message-book-app/src/messages/dto/create-message.dto.ts)
**Example Usage:** [messages.controller.ts](2-message-book-app/src/messages/messages.controller.ts)

## [3. Dependency Injection In-Depth](3-dependency-injection-indepth/src)

### CLI Commands for Generation

```bash
# Generate a module
nest generate module computer

# Generate a service (includes @Injectable() decorator by default)
nest generate service cpu

# Generate a controller
nest generate controller computer
```

**Note:** If a module with the same name already exists, the service or controller will be created inside that module.

### Dependency Injection Overview

Dependency Injection (DI) is about using Inversion of Control to avoid manually creating numerous classes and instances. Wire classes into the NestJS DI container using the `@Injectable()` decorator.

### DI Container Flow

1. **Registration** - All classes are registered with the container at startup
2. **Analysis** - Container analyzes dependencies for each class
3. **Instantiation** - When requesting a class instance, the container:
   - Creates all required dependencies first
   - Returns the fully instantiated class
   - Caches instances for reuse when needed

### Decorator Definitions

- **`@Controller()`** - Marks a class as a NestJS controller that can receive inbound requests and produce responses
- **`@Injectable()`** - Marks a class as a provider that can be injected into other classes via constructor parameter injection
- **`@Module()`** - Marks a class as a module for organizing application structure. Controllers and providers are scoped by module

#### Module Configuration Properties

- **`imports`** - Array of modules this module depends on. Once imported, all exported services become available
- **`exports`** - List of providers (services) that should be available to other modules that import this module
- **`controllers`** - List of controllers defined in this module that need to be instantiated
- **`providers`** - List of providers that will be instantiated by the NestJS injector and shared within this module

**Note:** You cannot add services from other modules directly in the `providers` array.

### Exporting Services Between Modules

1. **Default Behavior** - Services are private to their module by default
2. **Export Services** - Add services to the `exports` array to make them available to other modules
3. **Import Module** - Other modules must import the module to access its exported services
4. **Use Services** - Inject the imported service into constructors to call its methods

## [4. Car Trader App](4-car-trader-app/src)

### Environment Variables

- **`process.env.NODE_ENV`** - Looks for environment values in the `"start:dev": "NODE_ENV=dev nest start --watch"` script
- **Environment Files** - Create separate environment files for different environments:
  - `.env.dev` → `DB_NAME=db.sqlite`
  - `.env.test` → `DB_NAME=test.sqlite`
- **Security** - Validation pipe option `whitelist: true` strips invalid properties from incoming request bodies

### HTTP Requests with REST Client Extension

Add REST API calls to a `.http` file for easy testing with the VS Code REST Client extension.

**Example:** [request.http](4-car-trader-app/api)

### Database Fundamentals (RDBMS)

**Core Concepts:**

- **Entity** - A "thing" or "object" in the real world that contains attributes describing it
- **Entity Set** - A collection of similar entities that share the same attributes (e.g., all students in a school)
- **Attributes** - Characteristics or properties that describe an entity
- **Entity Type** - A category of entities that share the same attributes
- **Entity Instance** - A specific occurrence of an entity type with a unique identity (primary key)

### TypeORM Integration

**Setup:**

1. **Install dependencies:**

   ```bash
   npm install @nestjs/typeorm typeorm sqlite3
   ```

2. **Import TypeORM module** in your app module: [app.module.ts](4-car-trader-app/src/app.module.ts)

**TypeORM Entities** - Unlike manual repository creation in the Message Book app, TypeORM automatically generates repositories behind the scenes.

**Creating an Entity:**

1. Create an entity file with a class containing all properties
   - **Example:** [users.entity.ts](4-car-trader-app/src/users/users.entity.ts)
2. Link the entity to its parent module using `TypeOrmModule.forFeature([User])`
3. Connect the entity to the root database connection in the app module

**TypeORM Repository API** - Each entity has its own built-in repository with specific methods:

- **`create()`** - Generates a new entity instance (does not save to database)
- **`save()`** - Adds or updates a record in the database
- **`find()`** - Executes a query and returns a list of entities
- **`findOne()`** - Executes a query and returns the first matching record
- **`remove()`** - Removes a record from the database

**Note:** Some methods work with entity instances (triggering hooks like `AfterInsert`, `AfterRemove`, `AfterUpdate`), while others work directly with the database (`insert()`, `update()`, `delete()`).

**Database Migrations:**

- The `synchronize: true` option automatically handles database schema changes
- **Important:** Never use `synchronize: true` in production environments

### Interceptors

Interceptors can modify incoming requests and/or outgoing responses. They can be applied at different levels and execute at two key moments:

**Application Levels:**

- Route level
- Controller level
- Global level

**Execution Timing:**

1. **Before** the route handler is triggered
2. **After** the route handler completes, before the response is sent

**Globally Scoped Interceptors** can be used by any module, controller, or service.

- **Example:** [users.module.ts](4-car-trader-app/src/users/users.module.ts)
- **Drawback:** May execute unnecessary database queries for routes that don't need them

#### Class Serializer Interceptor (Recommended)

**Limitations of NestJS Built-in Solution:**

- The `@Exclude` decorator lacks dynamic control over field serialization

**How it Works:**

- Converts entity instances to plain objects using rules defined in the entity file
- Uses the powerful `class-transformer` package for declarative object transformation

**Usage:**

```typescript
@UseInterceptors(ClassSerializerInterceptor)
```

**Scope Options:**

- **Controller level** - Applied to all handlers in the controller
- **Method level** - Applied only to specific methods
- **Parameter** - Can accept a single interceptor or array of interceptors

**Transform Decorator** - Transform response objects before sending:

```typescript
@Transform((report: { obj: { user: User } }) => {
  return report.obj.user.id;
})
```

**Example Implementation:** [view-reports.dto.ts](4-car-trader-app/src/reports/dto/view-reports.dto.ts)

#### Custom Interceptor with DTOs

Create custom interceptors for flexible response transformation:

**Benefits:**

- Convert entities to plain objects
- Apply different serialization rules using custom DTOs
- Support different DTOs for different route handlers (e.g., AdminUserDTO, PublicUserDTO)

**Example Implementation:** [serialize.interceptor.ts](4-car-trader-app/src/users/interceptor/serialize.interceptor.ts)

```typescript
class CustomInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    // Custom transformation logic
  }
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

Guards control access to routes based on specific conditions and can be applied at multiple levels:

**Application Levels:**

- Application-wide
- Controller-level
- Individual handler-level

**Implementation:**

- Implement the `canActivate()` method that returns whether the request should proceed
- Return type can be synchronous (`boolean`) or asynchronous (`Promise<boolean>` or `Observable<boolean>`)
- **Return `true`** to allow access
- **Return `false`** to deny access (returns 403 Forbidden)

**Usage:**

```typescript
@UseGuards(AuthGuard)
```

**Global Setup:**

```typescript
app.useGlobalGuards(new AuthGuard());
```

**Example Implementation:**

```typescript
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return !!request.session.userId; // Allow if userId exists in session
  }
}
```

### Converting Interceptors to Middleware

**Context:** The CurrentUser interceptor was converted to CurrentUser global middleware.

**Reason for Conversion:**

- Interceptors execute **after** guards
- Using an interceptor within a guard would cause logic failures
- Converting to middleware ensures proper execution order

**Screenshot:** [5-convert-interceptor-to-middleware.png](4-car-trader-app/screenshots/5-convert-interceptor-to-middleware.png)

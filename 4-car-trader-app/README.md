# NestJS-Car-Trader

- Validation pipe option `whitelist:true` strips in-valid properties from the incoming body object for security

## HTTP Request using REST client vscode extension

- Add REST calls to a `.http` file. Example : [request.http](4-car-trader-app/request.http)

## RDBMS

- Entity: An entity is a "thing" or "object" in the real world. An entity contains attributes, which describe that entity. So anything about which we store information is called an entity.
- Entity Set: An entity set is a collection of similar types of entities that share the same attributes. For example: All students of a school are an entity set of Student entities.
- Attributes: Each entity has attributes, which are the characteristics or properties that describe the entity.
- Entity Type: A category or class of entities that share the same attributes is referred to as an entity kind.
- Entity Instance: An entity example is a particular instance or character entity within an entity type. Each entity instance has a unique identity, often known as the primary key.

## TypeORM

- `sqlite` is a file based database
- `npm install @nestjs/typeorm typeorm sqlite3`
- `import` the [typeorm module](src/app.module.ts) inside the `@Module()` decorator
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

## Interceptors (Middlewares)

- Interceptors can mess around with incoming requests and/or outgoing responses
- We can as many interceptors as we want
- Interceptors can be applied at route level, controller or global
- Code inside the interceptor triggered in 2 occassion
  - Interceptor code executed prior to the route handler being triggered
  - Interceptor code executed before the API response is sent
- Gloablly scoped interceptor can be used aby module or controller or service [example](4-car-trader-app/src/users/users.module.ts)


### Class Serializer Interceptor Approach (Nest recommended)

- NestJS's built-in solution (e.g., `@Exclude`) lacks dynamic control over what fields are serialized.
- Turns the instance of the entity into a plain object based on some rules set in the entity file
- `@UseInterceptors()` Decorator that binds interceptors to the scope of the controller or method, depending on its context.
  - When `@UseInterceptors` is used at the controller level, the interceptor will be applied to every handler (method) in the controller.
  - When `@UseInterceptors` is used at the individual handler level, the interceptor will apply only to that specific method.
  - `@param` a single interceptor instance or class, or a list of interceptor instances or classes.
- `ClassSerializerInterceptor` interceptor uses the powerful class-transformer package to provide a declarative and extensible way of transforming objects. The basic operation it performs is to take the value returned by a method handler and apply the `instanceToPlain()` function from class-transformer. In doing so, it can apply rules expressed by class-transformer decorators (example: `Exclude()`) on an entity/DTO class,

### [Custom Interceptor approach using DTO's](4-car-trader-app/src/users/interceptor/serialize.intercept.ts)

- Create a custom interceptor to handle response transformation
  - Converts the user entity to a plain object.
  - Applies serialization rules defined in custom DTOs (Data Transfer Objects).
- Introduce different DTOs for different route handlers (e.g., AdminUserDTO, PublicUserDTO).

```typescript
class CustomInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {}
}
```

## Cookie-Session

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

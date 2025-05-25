# NestJS-Car-Trader

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
- When using TypeORM, we don't need to manually create repository files as we did in our previous application. Instead, these repositories are created automatically behind the scenes. We won't see any generated files or anything like that; we will simply have classes created for us.
- Migration alters the structure of the database and its data. In TypeORM, the `synchronize: true` feature handles migrations automatically, so we don't need to write any explicit migration SQL scripts for the development environment.
  **IMPORTANT:** Never set the `synchronize` flag to `true` in a production environment.

### Creating an Entity in TypeORM

- First, create an entity file and define a class within it that contains all the properties for your entity.
- Next, link the entity to its parent module to establish a repository.
- Finally, connect the entity to the root connection in the app module.

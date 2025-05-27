# NestJS-Car-Trader

- Validation pipe option `whitelist:true` strips in-valid properties from the incoming body object for security

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

- [TypeORM Repository API](https://typeorm.io/repository-api): Repository is specific to an entity. In other words, each entity will have its own, build-in repository and it can be accessed using getRepository() method
  - `create()` - Generates new entity instance, but does not store data into the DB
  - `save()` - Adds or updates a record to the DB
  - `find()` - Runs a query and returns a list of entities
  - `findOne()` - Run a query, returning the first record matching the search criteria
  - `remove()` - Remove a record from the DB
- **Migration** alters the structure of the database and its data. In TypeORM, the `synchronize: true` feature handles migrations automatically, so we don't need to write any explicit migration SQL scripts for the development environment.
  **IMPORTANT:** Never set the `synchronize` flag to `true` in a production environment.

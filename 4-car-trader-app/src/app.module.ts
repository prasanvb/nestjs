import { MiddlewareConsumer, Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
import { User } from "./users/users.entity";
import { Report } from "./reports/reports.entity";
import { AuthModule } from "./auth/auth.module";
import { cookieSessionSetup, pipeSetUp } from "./middlewares";

// Import TypeOrmModule with SQLite configuration
const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: "sqlite",
  database: "db.sqlite",
  // Entities to be loaded for this connection. Accepts both entity classes and directories where from entities need to be loaded.
  entities: [User, Report],
  // Indicates if database schema should be auto created on every application launch. Be careful with this option and don't use this in production - otherwise you can lose production data. This option is useful during debug and development.
  synchronize: true,
  logging: true,
};

@Module({
  imports: [AuthModule, UsersModule, ReportsModule, TypeOrmModule.forRoot(typeOrmModuleOptions)],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: pipeSetUp,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSessionSetup).forRoutes("*");
  }
}

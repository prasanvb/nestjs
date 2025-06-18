import { ValidationPipe } from "@nestjs/common";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
import { User } from "./users/users.entity";
import { Report } from "./reports/reports.entity";
import { AuthModule } from "./auth/auth.module";
import { cookieSessionMiddleware } from "./middleware/cookieSessionMiddleware";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RequestHandler } from "express";

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

/* 
  Config Modules
*/
const NestConfigModule = ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` });

// const TypeOrmConfigModule = TypeOrmModule.forRoot({});
const NewTypeOrmConfigModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: "sqlite",
    database: config.get<string>("DB_NAME"),
    // Entities to be loaded for this connection. Accepts both entity classes and directories where from entities need to be loaded.
    entities: [User, Report],
    // `synchronize: true` - Indicates if database schema should be auto created on every application launch. Be careful with this option and don't use this in production - otherwise you can lose production data. This option is useful during debug and development.
    synchronize: process.env.NODE_ENV !== "production",
    // console logging for DB queries made, enabled only in non-production environments for performance
    logging: process.env.NODE_ENV !== "production",
  }),
});

//
export const inputBodyValidatorPipe = new ValidationPipe({
  // validator strips in-valid properties from the incoming body object that do not match decorators in the DTOs
  whitelist: true,
});

@Module({
  imports: [NestConfigModule, NewTypeOrmConfigModule, AuthModule, UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: inputBodyValidatorPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware is applied to all the routes in the application
    consumer.apply(cookieSessionMiddleware as RequestHandler).forRoutes("*");
  }
}

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
import { cookieSessionSetup, pipeSetUp } from "./middlewares";
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
    synchronize: true,
    // console logging for a DB queries made
    logging: true,
  }),
});

@Module({
  imports: [NestConfigModule, NewTypeOrmConfigModule, AuthModule, UsersModule, ReportsModule],
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
    consumer.apply(cookieSessionSetup as RequestHandler).forRoutes("*");
  }
}

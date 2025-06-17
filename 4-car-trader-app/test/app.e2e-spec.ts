import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "../src/app.module";
import { setUpMiddlewares } from "../src/main";
import { signUpUserDatatype } from "./e2e.interface";

const signUpUserData = {
  email: "prasanv1@gmail.com",
  password: "prasan",
};

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setUpMiddlewares(app);
    await app.init();
  });

  it("handle sing up request", () => {
    return request(app.getHttpServer())
      .post("/auth/signup")
      .send(signUpUserData)
      .expect(201)
      .then((res) => {
        const { email, id } = res.body as signUpUserDatatype;
        expect(id).toBeDefined();
        expect(email).toEqual(signUpUserData.email);
      });
  });

  it("get the current logged in user after successful sign up", async () => {
    const email = "prasanv2@gmail.com";
    const res = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ ...signUpUserData, ...{ email } })
      .expect(201);

    const cookie = res.get("set-Cookie");

    if (cookie) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { body } = await request(app.getHttpServer()).get("/auth/whoami").set("Cookie", cookie).expect(200);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(body.email).toEqual(email);
    }
  });
});

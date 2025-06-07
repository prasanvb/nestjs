import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "./../src/app.module";

interface signUpUserDatatype {
  email: string;
  id: number;
}
const signUpUserData = {
  email: "prasanbv1@gmail.com",
  password: "prasan",
};

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],

    }).compile();

    app = moduleFixture.createNestApplication();
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
});

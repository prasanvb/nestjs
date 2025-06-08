import { rm } from "fs/promises";
import { join } from "path";

global.beforeEach(async () => {
  console.log({ testSqlitePath: join(__dirname, "..", "test.sqlite") });

  try {
    await rm(join(__dirname, "..", "test.sqlite"));
  } catch (e) {
    console.info(e);
  }
});

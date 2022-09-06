import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
const app = express();
app.use(bodyParser.json());

app.get("/userTimber", async function (req: Request, res: Response) {
  const teste = await AppDataSource.manager.save(
    AppDataSource.manager.create(User, {
      firstName: "Timber",
      lastName: "Saw",
      age: 27,
    })
  );
  res.json(teste);
});

console.log(
  "Express server has started on port 3000. Open http://localhost:3000/"
);
app.listen(3000);

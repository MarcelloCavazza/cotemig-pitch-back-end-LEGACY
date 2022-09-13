import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./database/data-source";
import { routes } from "./http/routes/index.routes";
import * as cors from "cors";
import { handleError } from "./http/middleware/error/handleError";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log("Error during build: ", error));

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/v1", routes);
app.use(handleError);

app.listen(3000, () => {
  console.log(
    "Express server has started on port 3000. Open http://localhost:3000/"
  );
});

import { Router } from "express";

const user = Router();

user.get("/teste", (req, res) => {
  res.send("funfou");
});

export { user };

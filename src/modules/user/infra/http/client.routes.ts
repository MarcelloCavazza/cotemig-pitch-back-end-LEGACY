import { Router } from "express";

const client = Router();

client.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

client.post("/create", (req, res) => {});

export { client };

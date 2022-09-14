import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../mainError/mainErrorClass";
import * as dotenv from "dotenv";
dotenv.config();

const checkTokenAdmin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError("Token can not be empty", 403);
  }

  try {
    const [, token] = authToken.split(" ");
    verify(token, process.env.SECRET_KEY_ADMIN);
    next();
  } catch (error) {
    throw new AppError("Invalid Token", 403);
  }
};

export { checkTokenAdmin };

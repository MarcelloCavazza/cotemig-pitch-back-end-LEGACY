import { NextFunction, Request, response } from "express";
import { AppError } from "../../../mainError/mainErrorClass";

export const handleError = (
  error: Error,
  request: Request,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`,
  });
};

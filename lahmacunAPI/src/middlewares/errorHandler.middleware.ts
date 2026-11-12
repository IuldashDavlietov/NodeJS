import type { NextFunction, Request, Response } from "express";
import type { ErrorResponse } from "../types/api";

export function notFound(req: Request, res: Response, next: NextFunction): void {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  (error as any).statusCode = 404;
  next(error);
}

// Anything can be thrown in JS, so err is unknown until we check it.
export default (err: unknown, req: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
  const error = err instanceof Error ? err : new Error(String(err));

  const statusCode = "statusCode" in error && typeof error.statusCode === "number" ? error.statusCode : 500;

  res.status(statusCode).send({
    success: false,
    message: error.message,
    cause: error.cause,
    // stack: error.stack,
  });
};

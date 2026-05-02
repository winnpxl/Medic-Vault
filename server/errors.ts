import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { captureException } from "./observability";

export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction): void {
  next(new HttpError(404, "Route not found"));
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "ValidationError",
      requestId: req.requestId,
      details: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ error: err.message, requestId: req.requestId });
    return;
  }

  captureException(err, req);
  console.error("Unhandled server error:", err);
  res.status(500).json({ error: "InternalServerError", requestId: req.requestId });
}

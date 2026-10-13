import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  console.error("[API ERROR]", error);
  response.status(500).json({ message: "Ocorreu um erro interno." });
}

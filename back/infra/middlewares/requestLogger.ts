import type { NextFunction, Request, Response } from "express";

export function requestLogger(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const startedAt = performance.now();

  response.on("finish", () => {
    const elapsed = performance.now() - startedAt;
    console.info(
      `[HTTP] ${request.method} ${request.originalUrl} ${response.statusCode} ${elapsed.toFixed(2)} ms`
    );
  });

  next();
}

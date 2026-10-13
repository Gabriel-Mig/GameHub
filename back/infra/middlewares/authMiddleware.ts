import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { environment } from "../config/environment";

export interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string };
}

export function authMiddleware(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) {
  const authorization = request.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    response.status(401).json({ message: "Autenticação necessária." });
    return;
  }

  try {
    const payload = jwt.verify(token, environment.jwtSecret) as {
      id: number;
      role: string;
    };
    request.user = payload;
    next();
  } catch {
    response.status(401).json({ message: "Token inválido ou expirado." });
  }
}

export function adminOnly(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) {
  if (request.user?.role !== "admin") {
    response.status(403).json({ message: "Acesso restrito ao administrador." });
    return;
  }

  next();
}

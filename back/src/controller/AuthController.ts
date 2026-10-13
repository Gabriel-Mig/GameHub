import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { db } from "../../infra/database/db";
import { environment } from "../../infra/config/environment";

export class AuthController {
  login = async (request: Request, response: Response) => {
    const parsed = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    }).safeParse(request.body);

    if (!parsed.success) {
      response.status(400).json({ message: "Informe um e-mail e uma senha válidos." });
      return;
    }

    const result = await db.query<{
      id: number;
      name: string;
      email: string;
      password_hash: string;
      role: "admin" | "student";
    }>(
      "SELECT id, name, email, password_hash, role FROM users WHERE email = $1",
      [parsed.data.email]
    );
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(parsed.data.password, user.password_hash))) {
      response.status(401).json({ message: "E-mail ou senha incorretos." });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      environment.jwtSecret,
      { expiresIn: "2h" }
    );

    response.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  };
}

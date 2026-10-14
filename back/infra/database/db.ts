import { Pool } from "pg";
import { environment } from "../config/environment";

export const db = new Pool({
  connectionString: environment.databaseUrl
});

db.on("error", (error) => {
  console.error("Erro inesperado na conexão com PostgreSQL:", error);
});

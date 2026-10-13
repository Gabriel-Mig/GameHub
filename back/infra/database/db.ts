import { Pool } from "pg";
import { environment } from "../config/environment";

export const db = new Pool({
  connectionString: environment.databaseUrl
});

// Evita encerrar o processo sem liberar conexões em scripts curtos.
db.on("error", (error) => {
  console.error("Erro inesperado na conexão com PostgreSQL:", error);
});

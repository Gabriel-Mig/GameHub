import { app } from "./app";
import { environment } from "../infra/config/environment";

app.listen(environment.port, () => {
  console.info(`GameHub API disponível em http://localhost:${environment.port}`);
});

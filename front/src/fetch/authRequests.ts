import type { LoginDTO, LoginResponseDTO } from "@/dto/AuthDTO";
import { apiRequest } from "@/fetch/api";

export function login(credentials: LoginDTO) {
  return apiRequest<LoginResponseDTO>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });
}

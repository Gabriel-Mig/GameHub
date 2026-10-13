"use client";

import { useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function logout() {
    window.localStorage.removeItem("gamehub-token");
    setIsAuthenticated(false);
  }

  return { isAuthenticated, setIsAuthenticated, logout };
}

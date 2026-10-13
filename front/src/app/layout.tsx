import type { Metadata } from "next";
import { AppHeader } from "@/components/AppHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "GameHub | Gestão de produtos",
  description: "Catálogo didático para uma loja de games."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-shell">
          <AppHeader />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

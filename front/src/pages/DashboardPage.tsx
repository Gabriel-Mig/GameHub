"use client";

import { useCallback, useEffect, useState } from "react";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { MetricCard } from "@/components/MetricCard";
import { apiRequest } from "@/fetch/api";

interface DashboardDTO {
  totalProducts: number;
  lowStock: number;
  inventoryValue: number;
  categories: number;
}

export function DashboardPage() {
  const [data, setData] = useState<DashboardDTO | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiRequest<DashboardDTO>("/dashboard");
      setData(result);
      setUpdatedAt(new Date());
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Erro ao carregar dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const numberFormat = new Intl.NumberFormat("pt-BR");
  const lowStockPercentage = data && data.totalProducts > 0
    ? numberFormat.format((data.lowStock / data.totalProducts) * 100)
    : "0";

  return (
    <section>
      <div className="page-heading">
        <div>
          <span className="eyebrow">VISÃO GERAL</span>
          <h1>Dashboard</h1>
          <p className="section-intro">
            Indicadores atuais do catálogo GameHub.
            {updatedAt && ` Atualizado às ${updatedAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}.`}
          </p>
        </div>
        <button className="button button--secondary" onClick={() => void loadDashboard()} disabled={loading}>
          {loading ? "Atualizando..." : "Atualizar indicadores"}
        </button>
      </div>
      {error ? <ErrorState message={error} onRetry={() => void loadDashboard()} /> : loading ? <LoadingState /> : data && (
        <div className="metrics-grid">
          <MetricCard label="Produtos" value={numberFormat.format(data.totalProducts)} description="Itens cadastrados" />
          <MetricCard label="Estoque baixo" value={numberFormat.format(data.lowStock)} description={`5 unidades ou menos • ${lowStockPercentage}% do catálogo`} />
          <MetricCard label="Categorias" value={numberFormat.format(data.categories)} description="Categorias disponíveis" />
          <MetricCard label="Valor em estoque" value={data.inventoryValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} description="Preço × quantidade" />
        </div>
      )}
    </section>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
}

export function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{description}</small>
    </article>
  );
}

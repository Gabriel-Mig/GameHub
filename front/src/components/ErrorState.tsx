interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state-message state-message--error" role="alert">
      <p>{message}</p>
      {onRetry && <button className="button" onClick={onRetry}>Tentar novamente</button>}
    </div>
  );
}

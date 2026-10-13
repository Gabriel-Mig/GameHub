export async function measurePerformance<T>(
  label: string,
  operation: () => Promise<T>
): Promise<T> {
  const startedAt = performance.now();

  try {
    return await operation();
  } finally {
    const elapsed = performance.now() - startedAt;
    console.info(`[PERFORMANCE] ${label}: ${elapsed.toFixed(2)} ms`);
  }
}

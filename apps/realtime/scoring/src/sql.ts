export interface SqlClient {
  query(text: string, params: unknown[]): Promise<{ rows: Record<string, unknown>[] }>;
}

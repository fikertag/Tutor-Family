import { authClient } from "@/lib/auth-client";
import { ApiResponse } from "@/types/api";

let cachedToken: string | null = null;

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  if (!cachedToken) {
    const { data } = await authClient.getSession();
    cachedToken = data?.session.token ?? null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(cachedToken ? { Authorization: `Bearer ${cachedToken}` } : {}),
        ...options.headers,
      },
    }
  );

  const json: ApiResponse<T> = await response.json(); // typed response

  if (!response.ok) {
    throw new Error(json.message || `API Error: ${response.status}`);
  }

  return json.data;
};

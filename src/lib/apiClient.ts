import { authClient } from "@/lib/auth-client";
import { ApiResponse } from "@/types/api";

// let cachedToken: string | null = null;

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  // console.log("cachedToken before check:", cachedToken);
  // if (!cachedToken) {
  const { data } = await authClient.getSession();
  const cachedToken = data?.session.token ?? null;
  // }

  const isFormData = options.body instanceof FormData;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1${endpoint}`,
    {
      ...options,
      headers: {
        ...(cachedToken ? { Authorization: `Bearer ${cachedToken}` } : {}),
        ...(!isFormData ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    }
  );

  const json: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(json.message || `API Error: ${response.status}`);
  }

  return json.data;
};

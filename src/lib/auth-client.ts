import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`,
  plugins: [inferAdditionalFields<typeof auth>()],
});

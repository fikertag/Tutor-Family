import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: "https://tutor-server-tnat.onrender.com/api/v1/auth",
  plugins: [inferAdditionalFields<typeof auth>()],
});

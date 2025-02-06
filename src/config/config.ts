export const config = {
  api: {
    baseUrl:
      (import.meta.env.VITE_API_BASE_URL as string) ||
      "http://localhost:3000/api/v1",
  },
  auth: {
    tokenName: "jwt_token",
  },
} as const;

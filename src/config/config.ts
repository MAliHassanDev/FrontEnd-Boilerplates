export const config = {
  api: {
    baseUrl:
      (import.meta.env.VITE_API_BASE_URL as string) ||
      "http://localhost:3000/v1/sms",
  },
  auth: {
    tokenName: "jwt_token",
  },
} as const;

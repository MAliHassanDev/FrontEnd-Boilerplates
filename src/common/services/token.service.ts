import { axiosPublic } from "@/api/axios";

type RefreshTokenResponse = {
  access_token: string;
  roles: number[];
};

export async function refreshAuthToken() {
  const response = await axiosPublic<RefreshTokenResponse>({
    method: "POST",
    url: "/refresh-token",
    withCredentials: true,
  });
  return response.data;
}

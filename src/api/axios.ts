import { store } from "@/app/store/store";
import { config } from "@/config/config";
import { authActions } from "@/features/auth/auth.slice";
import { logger } from "@/lib/logger";
import { refreshAuthToken } from "@/common/services/token.service";
import axios, { AxiosError } from "axios";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    sent?: boolean;
  }
}

export const axiosPublic = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = createPrivateAxiosInstance();

function createPrivateAxiosInstance() {
  const axiosPrivate = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
  // attaches access token in every request header
  axiosPrivate.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${store.getState().auth.token ?? ""}`;
    }
    return config;
  });

  // generates new access token on first unauthorized response
  axiosPrivate.interceptors.response.use(
    response => {
      return response;
    },
    async (error: AxiosError) => {
      const prevRequest = error.config;
      if (error.response?.status === 401 && prevRequest && !prevRequest.sent) {
        prevRequest.sent = true;
        logger.info("Access token expired");
        try {
          const token = await refreshAuthToken();
          prevRequest.headers.Authorization = `Bearer ${token}`;
          return await axiosPrivate.request(prevRequest);
        } catch (error: unknown) {
          logger.error(error, "AxiosPrivateInterceptor");
          // remove auth token from store if refresh token fails
          store.dispatch(authActions.deleteToken());
          if (error instanceof Error) {
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    },
  );
  return axiosPrivate;
}

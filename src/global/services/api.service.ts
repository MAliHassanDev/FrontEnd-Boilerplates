import { logger } from "@/lib/logger";
import { ApiException } from "@/utils/exceptions";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";

export type ApiError = {
  message: string;
  statusCode: number;
  code: string;
};

export class ApiService {
  public constructor(private readonly baseConfig: AxiosRequestConfig) {}
  public async makeRequest<R, D = void>(config: AxiosRequestConfig<D>) {
    try {
      const response = await axios<R>({
        ...this.baseConfig,
        ...config,
      });
      return response.data;
    } catch (error) {
      logger.error(error, "Api Service");

      if (axios.isAxiosError<ApiError>(error) && error.response) {
        const { message, statusCode, code } = error.response.data;
        throw new ApiException(message, statusCode, code);
      } else {
        throw error;
      }
    }
  }
}

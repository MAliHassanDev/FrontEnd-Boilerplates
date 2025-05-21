import { refreshAuthToken } from "../services/token.service";
import { useEffect, useState } from "react";
import { logger } from "@/lib/logger";
import { FullPageLoader } from "./ui/FullPageLoader";
import { Outlet } from "react-router";
import { useAuthStore } from "@/core/auth/auth.store";

export const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const authState = useAuthStore();

  useEffect(() => {
    async function refreshToken() {
      try {
        const auth = await refreshAuthToken();
        authState.setAuth(auth);
      } catch (error: unknown) {
        logger.error("Failed to refresh auth Token", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (!authState.auth) {
      void refreshToken();
    } else {
      setIsLoading(false);
    }
  }, [authState]);

  return isLoading ? <FullPageLoader /> : <Outlet />;
};

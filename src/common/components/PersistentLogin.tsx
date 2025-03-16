import type { RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { refreshAuthToken } from "../services/token.service";
import { useEffect, useState } from "react";
import { authActions } from "@/core/auth/auth.slice";
import { logger } from "@/lib/logger";
import { FullPageLoader } from "./ui/FullPageLoader";
import { Outlet } from "react-router";

export const PersistentLogin = () => {
  const dispatch = useDispatch();
  const authToken = useSelector<RootState>(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function refreshToken() {
      try {
        const { access_token, roles } = await refreshAuthToken();
        dispatch(authActions.setAuth({ token: access_token, roles }));
      } catch (error: unknown) {
        logger.error("Failed to refresh auth Token", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (!authToken) {
      void refreshToken();
    } else {
      setIsLoading(false);
    }
  }, [authToken, dispatch]);

  return isLoading ? <FullPageLoader /> : <Outlet />;
};

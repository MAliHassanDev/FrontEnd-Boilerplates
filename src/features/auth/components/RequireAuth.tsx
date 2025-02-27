import type { RootState } from "@/app/store/store";
import { useService } from "@/hooks/custom/useService";
import { tokenService } from "@/services/token.service";
import { FullPageLoader } from "@/shared/components/ui/FullPageLoader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { authActions } from "../auth.slice";

export interface NavigationState {
  from?: {
    pathname: string;
  };
}

export const RequireAuth = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.auth.token);

  const { isLoading, error, data } = useService(
    authToken ? () => Promise.resolve(authToken) : tokenService.refreshAuthToken
  );

  useEffect(() => {
    if (data) {
      dispatch(authActions.setToken(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <FullPageLoader />;

  if (error) return <Navigate to="/login" />;

  return <Outlet />;
};

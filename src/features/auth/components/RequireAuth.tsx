import type { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { authActions } from "../auth.slice";
import { useService } from "@/common/hooks/custom/useService";
import { refreshAuthToken } from "@/common/services/token.service";
import { FullPageLoader } from "@/common/components/ui/FullPageLoader";

export interface NavigationState {
  from?: {
    pathname: string;
  };
}

export const RequireAuth = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.auth.token);

  const { isLoading, error, data } = useService(
    authToken ? () => Promise.resolve(authToken) : refreshAuthToken,
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

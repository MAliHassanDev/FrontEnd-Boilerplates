import type { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { useService } from "@/common/hooks/custom/useService";
import { refreshAuthToken } from "@/common/services/token.service";
import { FullPageLoader } from "@/common/components/ui/FullPageLoader";
import { authActions } from "../auth.slice";

export interface NavigationState {
  from?: {
    pathname: string;
  };
}

export const RequireAuth = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  const { isLoading, error, data } = useService(
    authToken ? () => Promise.resolve(authToken) : refreshAuthToken,
  );

  useEffect(() => {
    if (data) {
      dispatch(authActions.setToken(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <FullPageLoader />;

  if (error) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
};

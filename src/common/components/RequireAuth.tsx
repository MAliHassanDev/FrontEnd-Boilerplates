import type { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

type RequireAuthProps = {
  allowedRoles: number[];
};

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const authState = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  const hasAllowedRole = !!authState.roles?.some(role =>
    allowedRoles.includes(role),
  );

  // show the content if user has one of the allowed roles
  if (hasAllowedRole) return <Outlet />;

  // if user doesn't have any allowed roles but has access token redirect to unAuth page
  if (authState.token)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;

  // Redirect to login to user is missing both access token and allowed roles
  return <Navigate to="/login" state={{ from: location }} />;
};

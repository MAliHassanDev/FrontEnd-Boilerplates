import { useAuthStore } from "@/core/auth/auth.store";
import { Navigate, Outlet, useLocation } from "react-router";

type RequireAuthProps = {
  allowedRoles: number[];
};

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const auth = useAuthStore(state => state.auth);
  const location = useLocation();

  // Redirect to login to user is missing both access token and allowed roles
  if (!auth) return <Navigate to="/login" state={{ from: location }} />;

  // show the content if user has one of the allowed roles
  const hasAllowedRole = allowedRoles.some(role => role === auth.role);
  if (hasAllowedRole) return <Outlet />;

  // if user doesn't have any allowed roles but has access token redirect to unAuth page
  if (auth.accessToken)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

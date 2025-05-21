import { Navigate, Outlet } from "react-router";
import { Header } from "../components/Header";
import { useUserProfile } from "@/core/users/services/users-query";
import { FullPageLoader } from "@/common/components/ui/FullPageLoader";

export const RootLayout = () => {
  const { isPending, isError } = useUserProfile();

  if (isError) return <Navigate to={"/login"} replace />;

  return isPending ? (
    <FullPageLoader />
  ) : (
    <div className="flex h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

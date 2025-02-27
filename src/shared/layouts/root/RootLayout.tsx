import { Footer } from "@/shared/layouts/components/Footer";
import { Header } from "@/shared/layouts/components/Header";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

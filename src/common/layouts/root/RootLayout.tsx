import { Outlet } from "react-router";
import { Header } from "../components/Header";

export const RootLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

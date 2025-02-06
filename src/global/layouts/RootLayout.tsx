import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div>
      <header className="m-2 rounded border p-6 text-center">
        Root layout header
      </header>
      <Outlet />
    </div>
  );
};

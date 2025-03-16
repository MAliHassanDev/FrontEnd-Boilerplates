import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { ToastContainer } from "react-toastify";
import { Home } from "@/pages/home/HomePage";
import { SigninPage } from "@/features/auth/pages/SigninPage";
import { NotFoundPage } from "@/pages/notfound/NotFoundPage";
import { RequireAuth } from "@/features/auth/components/RequireAuth";
import { RootLayout } from "@/common/layouts/root/RootLayout";
import { logger } from "@/lib/logger";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="login" element={<SigninPage />} />
      {/* <Route path="register" element={<RegisterPage />} /> */}

      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

const App = () => {
  logger.info("App is running", "App");

  return (
    <div className="">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

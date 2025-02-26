import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { RootLayout } from "@/global/layouts/RootLayout";
import { ToastContainer } from "react-toastify";
import { Home } from "@/pages/home/Home";
import { SigninPage } from "@/features/auth/pages/SigninPage";
import { logger } from "@/lib/logger";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="signin" element={<SigninPage />} />
    </Route>,
  ),
);

const App = () => {
  logger.info("Hello World");
  return (
    <div className="">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

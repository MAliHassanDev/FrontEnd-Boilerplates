import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { ToastContainer } from "react-toastify";
import { Home } from "@/pages/home/HomePage";
import { NotFoundPage } from "@/pages/notfound/NotFoundPage";
import { RootLayout } from "@/common/layouts/root/RootLayout";
import { logger } from "@/lib/logger";
import { PersistentLogin } from "@/common/components/PersistentLogin";
import { SigninPage } from "@/core/auth/pages/SigninPage";
import { UnauthorizedPage } from "@/pages/unAuhtorized/UnAuthorizedPage";
import { RequireAuth } from "@/common/components/RequireAuth";
import { ROLES } from "@/common/constants/roles.contstant";
import { EditorPage } from "@/pages/editor/EditorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Public Routes */}
      <Route path="login" element={<SigninPage />} />
      <Route path="unauthorized" element={<UnauthorizedPage />} />

      {/* Private Routes */}
      <Route element={<PersistentLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<EditorPage />} />
        </Route>
      </Route>

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

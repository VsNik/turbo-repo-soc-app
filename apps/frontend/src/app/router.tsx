import { createBrowserRouter, redirect } from "react-router-dom";
import { ThemeProvider } from "./providers/theme-provider";
import { AppLoader } from "./loaders/app-loader";
import { AppLayout } from "./layouts/app-layout";
import { MainLayout } from "./layouts/main-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { RoutesName } from "@shared/constants";
import { HomePage } from "@pages/home";
import { FeedPage } from "@pages/feed";
import { LoginPage, SignupPage } from "@pages/auth";

export const router = createBrowserRouter([
  {
    element: (
      <ThemeProvider>
        <AppLoader>
          <AppLayout />
        </AppLoader>
      </ThemeProvider>
    ),
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: RoutesName.Home,
            element: <HomePage />,
          },
          {
            path: RoutesName.Feed,
            element: <FeedPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: RoutesName.Login,
            element: <LoginPage />,
          },
          {
            path: RoutesName.Signup,
            element: <SignupPage />,
          },
        ],
      },
      {
        path: "*",
        loader: () => redirect(RoutesName.Home),
      },
    ],
  },
]);

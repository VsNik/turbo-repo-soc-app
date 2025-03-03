import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/main-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { HomePage } from "@pages/home";
import { FeedPage } from "@pages/feed";
import { LoginPage, SignupPage } from "@pages/auth";
import { RoutesName } from "@shared/constants";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={RoutesName.Home} element={<HomePage />} />
        <Route path={RoutesName.Feed} element={<FeedPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path={RoutesName.Login} element={<LoginPage />} />
        <Route path={RoutesName.Signup} element={<SignupPage />} />
      </Route>
    </Routes>
  );
}

export default App;

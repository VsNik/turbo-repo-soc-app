import { RoutesName } from "@shared/constants";
import { Content } from "@shared/ui/content";
import { GoogleButton } from "@shared/ui/google-button";
import { Widget } from "@shared/ui/widget";
import { Link } from "react-router-dom";
import { LoginForm } from "./login-form";
import { ThemeToggler } from "@features/theme-toggler";

export function LoginPage() {
  return (
    <Content>
      <div className="relative flex w-full h-screen items-center justify-center p-5">
        <ThemeToggler className="absolute top-3 right-3 cursor-pointer" />
        <Widget className="flex max-w-5xl w-full min-h-[600px] bg-widget rounded-lg shadow-md">
          <div className="relative hidden w-1/2 sm:flex">
            <img
              src="/auth-img.avif"
              alt="auth-image rounded-l"
              className="rounded-l-lg object-cover"
            />
          </div>
          <div className="flex flex-col w-full h-full sm:w-1/2 space-y-3 p-10">
            <h1 className="text-2xl font-bold">LogIn to SocApp</h1>
            <LoginForm />
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted" />
              <span>OR</span>
              <div className="h-px flex-1 bg-muted" />
            </div>
            <GoogleButton />
            <div className="text-center">
              <Link
                to={RoutesName.Signup}
                className="inline w-fit text-center hover:underline"
              >
                Already heave an account? Log In
              </Link>
            </div>
          </div>
        </Widget>
      </div>
    </Content>
  );
}

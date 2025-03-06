import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { useLogin } from "./use-login";

export function LoginForm() {
  const { register, onSubmit, errors, isPending } = useLogin();

  return (
    <form className="w-full space-y-3 py-5" onSubmit={onSubmit}>
      <div className="flex flex-col w-full space-y-1">
        <label>E-mail</label>
        <Input
          className="h-10"
          inputProps={{
            ...register("email"),
            type: "text",
            placeholder: "Email",
          }}
        />
        {errors.email && (
          <small className="text text-xs text-red-700">
            {errors.email.message}
          </small>
        )}
      </div>
      <div className="flex flex-col w-full space-y-1">
        <label>Password</label>
        <Input
          className="h-10"
          inputProps={{
            ...register("password"),
            type: "password",
            placeholder: "Password",
          }}
        />
        {errors.password && (
          <small className="text text-xs text-red-700">
            {errors.password.message}
          </small>
        )}
      </div>
      <Button variant="primary" size="md" full isLoading={isPending}>
        Log In
      </Button>
    </form>
  );
}

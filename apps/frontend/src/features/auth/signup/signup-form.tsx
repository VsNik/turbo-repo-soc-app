import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";

export function SignupForm() {
  return (
    <form className="w-full space-y-3 py-5">
      <div className="flex flex-col w-full space-y-1">
        <label>Name</label>
        <Input
          className="h-10"
          inputProps={{
            type: "text",
            placeholder: "Name",
          }}
        />
      </div>
      <div className="flex flex-col w-full space-y-1">
        <label>E-mail</label>
        <Input
          className="h-10"
          inputProps={{
            type: "text",
            placeholder: "Email",
          }}
        />
      </div>
      <div className="flex flex-col w-full space-y-1">
        <label>Password</label>
        <Input
          className="h-10"
          inputProps={{
            type: "password",
            placeholder: "Password",
          }}
        />
      </div>
      <Button variant="primary" size="md" full isLoading={false}>
        Sign up
      </Button>
    </form>
  );
}

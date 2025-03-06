import { useSession } from "@entities/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthService } from "@shared/services";
import { catchError } from "@shared/services/catch-error";
import { Token } from "@shared/services/token";
import { signupSchema, TypeSignupSchema } from "@shared/types";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export function useSignup() {
  const [isPending, startTransition] = useTransition();
  const setSession = useSession((s) => s.setSession);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = handleSubmit(async (data: TypeSignupSchema) => {
    startTransition(async () => {
      try {
        const response = await AuthService.signupUser(data);
        setSession(response.user);
        Token.setAccessToken(response.access_token);
      } catch (err) {
        setFormError(catchError(err).message);
      }
    });
  });

  return { register, onSubmit, isPending, formError, errors };
}

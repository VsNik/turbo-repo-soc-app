import { useSession } from "@entities/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthService } from "@shared/services";
import { Token } from "@shared/services/token";
import { loginSchema, TypeLoginSchema } from "@shared/types";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export function useLogin() {
  const [isPending, startTransition] = useTransition();
  const setSession = useSession((s) => s.setSession);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data: TypeLoginSchema) => {
    startTransition(async () => {
      try {
        const response = await AuthService.loginUser(data);
        setSession(response.user);
        Token.setAccessToken(response.access_token);
      } catch (err) {
        console.log(err);
      }
    });
  });

  return { register, onSubmit, isPending, errors };
}

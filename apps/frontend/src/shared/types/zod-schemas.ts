import Z from "zod";

export const loginSchema = Z.object({
  email: Z.string().min(1).email(),
  password: Z.string().min(1),
});

export const signupSchema = Z.object({
  username: Z.string().min(1),
  email: Z.string().min(1).email(),
  password: Z.string().min(4).max(24),
});

export type TypeLoginSchema = Z.infer<typeof loginSchema>;
export type TypeSignupSchema = Z.infer<typeof signupSchema>;

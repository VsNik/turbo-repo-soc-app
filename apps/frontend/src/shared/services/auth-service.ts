import { Auth, TypeLoginSchema, TypeSignupSchema, User } from "@shared/types";
import { api } from "./api";

export class AuthService {
  static async check(): Promise<User> {
    return (await api.get<User>("/me")).data;
  }

  static async loginUser(data: TypeLoginSchema): Promise<Auth> {
    return (await api.post<Auth>("/login", data)).data;
  }

  static async signupUser(data: TypeSignupSchema): Promise<Auth> {
    return (await api.post("/signup", data)).data;
  }
}

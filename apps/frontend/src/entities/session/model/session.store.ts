import { AuthService } from "@shared/services";
import { User } from "@shared/types";
import { create } from "zustand";

type SessionStore = {
  isLoading: boolean;
  session?: User;
  loadSession: () => Promise<User>;
  setSession: (session: User) => void;
  removeSession: () => void;
};

export const useSession = create<SessionStore>((set) => ({
  isLoading: false,
  currentSession: undefined,
  loadSession: async () => {
    set({ isLoading: true });
    // AuthService.check()
    //   .then((res) => set({ session: res }))
    //   .finally(() => set({ isLoading: false }));
    const session = await AuthService.check();
    set({ session: session, isLoading: false });
    return session;
  },
  setSession: (session) => {
    set({ session: session });
  },
  removeSession: () => {
    set({ session: undefined });
  },
}));

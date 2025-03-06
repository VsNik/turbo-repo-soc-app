import { useSession } from "@entities/session";
import { PropsWithChildren, useEffect, useState } from "react";

export function AppLoader({ children }: PropsWithChildren) {
  const loadSession = useSession((s) => s.loadSession);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([loadSession()]).finally(() => setIsLoading(false));
  }, [loadSession]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return <>{children}</>;
}

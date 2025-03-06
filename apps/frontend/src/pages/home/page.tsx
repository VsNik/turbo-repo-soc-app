import { useSession } from "@entities/session";

export function HomePage() {
  const { session } = useSession();
  return (
    <>
      <h3>Home Page</h3>
      <strong>{session?.displayName}</strong>
    </>
  );
}

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const GetCurrentUser = () => {
  const [session, setSession] = useState<any | null>(null);
  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      setSession(session?.user);
    }
    fetchSession();
  }, []);

  return session;
};

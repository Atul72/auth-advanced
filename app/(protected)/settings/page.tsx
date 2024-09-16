"use client";
// import { GetCurrentUser } from "@/hooks/use-current-user";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    function FetchSession() {
      const session = useSession();
      setSession(session);
    }
    FetchSession();
  }, []);

  const onClick = () => {
    // logout(); // Redirect not working
    signOut();
  };

  return (
    <div>
      {JSON.stringify(session)}

      <button type="submit" onClick={onClick}>
        SignOut
      </button>
    </div>
  );
};

export default SettingsPage;

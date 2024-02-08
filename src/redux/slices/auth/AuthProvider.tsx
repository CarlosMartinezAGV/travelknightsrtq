import React, { createContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../../../supabase/main";
import { useDispatch } from "react-redux";
import { User } from "@supabase/supabase-js";

type GlobalContext = {
  user: User | null;
};
export const AuthContext = createContext<GlobalContext>({} as GlobalContext);

function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setUser(session?.user || null);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    // call unsubscribe to remove the callback
    return () => {
      data.subscription.unsubscribe();
    };
  }, [dispatch]);

  const contextValue = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

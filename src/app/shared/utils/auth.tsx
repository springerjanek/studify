import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../../supabase";
import { Session } from "@supabase/gotrue-js/src/lib/types";

const AuthContext = createContext<Session | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={session}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const session = useContext(AuthContext);
  const currentUser = session?.user;
  return { session, currentUser };
};

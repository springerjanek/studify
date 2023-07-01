import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../../supabase";
import { useAuth } from "@shared/utils/auth";
import { Navigate } from "react-router-dom";

export const SignIn = () => {
  const { session } = useAuth();
  return !session ? (
    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
  ) : (
    <Navigate to={"/"} />
  );
};

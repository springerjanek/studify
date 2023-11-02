import { supabase } from "@/app/supabase";

export const updatePassword = async ({password, toast}: {password: string, toast: any}) => {
  if (password.length > 5) {
    const { error: passwordError } = await supabase.auth.updateUser({
      password: password,
    });

    if (passwordError) {
      toast({
        title: "Error during updating password",
        description: passwordError.message,
        className: "text-red-500",
      });
      return;
    }

    toast({
      title: "Successfully updated your password!",
      className: "text-black",
    });
  } else {
    toast({
      title: "Password must be at least 6 characters",
      className: "text-red-500",
    });
  }
};

import React from "react";
import { ProfileFormValues } from "./ProfileForm";
import { User } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { supabase } from "@/app/supabase";

export const handleProfileFormSubmit = async ({
  data,
  queryClient,
  toast,
  currentUser,
  setLoading,
}: {
  data: ProfileFormValues;
  queryClient: QueryClient;
  toast: any;
  currentUser: User | undefined;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { error: updateEmailError } = await supabase.auth.updateUser({
    email: data.email,
  });

  if (updateEmailError) {
    toast({
      title: "Error during updating password",
      description: updateEmailError.message,
      className: "text-red-500",
    });

    return;
  }

  const { error: updateNameError } = await supabase
    .from("users")
    .update({ name: data.name })
    .eq("user_id", currentUser?.id);

  if (updateNameError) {
    toast({
      title: "Error during updating user name",
      description: updateNameError.message,
      className: "text-red-500",
    });

    return;
  }

  queryClient.invalidateQueries({ queryKey: ["user_name"] });

  toast({
    title: "Successfully updated your account information!",
    className: "text-black",
  });

  setLoading(false);
};

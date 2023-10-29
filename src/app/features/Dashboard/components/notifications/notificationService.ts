import { supabase } from "@/app/supabase";
import { QueryClient } from "@tanstack/react-query";

export const updateNotificationPreferences = async ({
  options,
  currentUserId,
  toast,
  queryClient,
}: {
  options: {
    noti_upcoming: boolean;
    noti_nextDay: boolean;
  };
  currentUserId: string;
  toast: any;
  queryClient: QueryClient;
}) => {
  const { noti_upcoming, noti_nextDay } = options;

  if (!noti_upcoming && !noti_nextDay) {
    toast({
      title: "You must make changes in order to update preferences",
      className: "text-red-500",
    });
    return;
  }

  const { error } = await supabase
    .from("users")
    .update({
      notifications: {
        noti_nextDay: noti_nextDay,
        noti_upcoming: noti_upcoming,
      },
    })
    .eq("user_id", currentUserId);

  if (error) {
    toast({
      title: error.message,
      className: "text-red-500",
    });
    return;
  }

  queryClient.invalidateQueries({ queryKey: ["user_noti_pref"] });

  toast({
    title: "Success!",
    className: "text-black",
  });
};

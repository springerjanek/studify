import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../supabase";

export type NotiPreferences = {
  notifications: {
  noti_nextDay: boolean;
  noti_upcoming: boolean;
  }
}[];

export const useGetUserNotiPreferences = (userId: string) => {
  const { isLoading, data } = useQuery({
    queryKey: ["user_noti_pref"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data: notiPreferences, error } = await supabase
        .from("users")
        .select("notifications")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }
      return notiPreferences as NotiPreferences;
    },
  });

  return { isLoading, data };
};
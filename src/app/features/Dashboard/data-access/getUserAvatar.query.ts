import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../supabase";

export type Avatar = {
  avatar_url: string;
}[];

export const useGetUserAvatar = (userId: string) => {
  const { isLoading, data } = useQuery({
    queryKey: ["user_avatar"],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    queryFn: async () => {
      const { data: avatar, error } = await supabase
        .from("users")
        .select("avatar_url")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }
      return avatar as Avatar;
    },
  });

  return { isLoading, data };
};

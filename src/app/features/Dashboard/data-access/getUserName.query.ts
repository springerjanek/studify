import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../supabase";

export type UserName = {
  name:string
}[];

export const useGetUserName = (userId: string) => {
  const { isLoading, data } = useQuery({
    queryKey: ["user_name"],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    queryFn: async () => {
      const { data: userName, error } = await supabase
        .from("users")
        .select("name")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }
      return userName as UserName;
    },
  });

  return { isLoading, data };
};

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../supabase";
import { Assignment } from "../components/Dashboard";

export const useGetUserAssignments = (userId: string) => {
  const { isLoading, data } = useQuery({
    queryKey: ["user_assignments"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data: user_assignments, error } = await supabase
        .from("assignments")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }
      return user_assignments as Assignment[];
    },
  });

  return { isLoading, data };
};

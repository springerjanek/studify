import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../supabase";

export type UserSchedule = {
  data: {
    assignments: [
      {
        name: string;
        dates: string[];
      }
    ];
  };
};

export const useGetUserSchedule = (userId: string) => {
  const { isLoading, data } = useQuery({
    queryKey: ["user_schedule"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data: user_schedule, error } = await supabase
        .from("schedules")
        .select("data")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }

      return user_schedule as UserSchedule[];
    },
  });

  return { isLoading, data };
};

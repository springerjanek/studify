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

export type UserScheduleResponse = {
  user_schedule: UserSchedule[];
  workingDates: string[];
};

export const useGetUserSchedule = (userId: string) => {
  const { isLoading, data } = useQuery<UserScheduleResponse>({
    queryKey: ["user_schedule"],
    refetchOnWindowFocus: false,
    staleTime: 30000,
    queryFn: async () => {
      const { data: user_schedule, error } = await supabase
        .from("schedules")
        .select("data")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }

      const workingDatesWithTimeRanges = user_schedule
        ? user_schedule.flatMap((obj: UserSchedule) =>
            obj.data.assignments.flatMap((assignment) => assignment.dates)
          )
        : [];

      const workingDates = workingDatesWithTimeRanges.map((date) => {
        return date.split(":")[0];
      });

      return { user_schedule, workingDates };
    },
  });

  return { isLoading, data };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../../supabase";
import { UserScheduleResponse } from "../getUserSchedule.query";

export const useDeleteUserAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      assignmentName,
    }: {
      userId: string;
      assignmentName: string;
    }) => {
      const scheduleQueryData: UserScheduleResponse | undefined =
        queryClient.getQueryData(["user_schedule"]);

      const userSchedule =
        scheduleQueryData && scheduleQueryData.user_schedule[0].data;

      if (userSchedule) {
        const scheduleWithoutDeletedAsssignment =
          userSchedule.assignments.filter((assignment) => {
            return assignment.name !== assignmentName;
          });

        const updatedSchedule = {
          assignments: scheduleWithoutDeletedAsssignment,
        };

        await supabase
          .from("schedules")
          .update({ data: updatedSchedule })
          .eq("user_id", userId);
      }

      await supabase.from("assignments").delete().eq("name", assignmentName);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_schedule"] });
      queryClient.invalidateQueries({queryKey: ["user_assignments"]})
    },
  });
};

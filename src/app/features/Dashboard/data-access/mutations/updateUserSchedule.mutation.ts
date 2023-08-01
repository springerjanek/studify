import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../../supabase";
import { UserSchedule } from "../getUserSchedule.query";

export const useUpdateUserSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      assignments,
      user_schedule,
    }: {
      userId: string;
      assignments: {
            name: string;
            dates: string[];
          }[] | undefined;
      user_schedule: UserSchedule[] | undefined;
    }) => {
      if (user_schedule && assignments) {
        const updatedAssignments = user_schedule[0].data.assignments.map(
          (userAssignment) => {
            const matchingAssignment = assignments.find(
              (assignment) => assignment.name === userAssignment.name
            );

            if (matchingAssignment) {
              return {
                name: matchingAssignment.name,
                dates: matchingAssignment.dates,
              };
            }

            return userAssignment;
          }
        );

        const updatedSchedule = {
          assignments: updatedAssignments,
        };
        await supabase
          .from("schedules")
          .update({ data: updatedSchedule })
          .eq("user_id", userId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_schedule"] });
    },
  });
};

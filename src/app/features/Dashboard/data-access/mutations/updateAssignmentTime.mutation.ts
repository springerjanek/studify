import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../../supabase";
import { UserSchedule } from "../getUserSchedule.query";

export const useUpdateAssignmentTime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      user_schedule,
      assignmentName,
      assignmentDate,
      newTimeFrame,
    }: {
      userId: string;
      user_schedule: UserSchedule[] | undefined;
      assignmentName: string;
      assignmentDate: string | undefined;
      newTimeFrame: string;
    }) => {
      if (user_schedule) {
        const updatedAssignments = user_schedule[0].data.assignments.map(
          (userAssignment) => {
            const updatedDates = userAssignment.dates.map((date) => {
              if (date === assignmentDate) {
                const [datePart, timeFramePart] = date.split(": ");
               return `${datePart}: ${newTimeFrame}`
              }

              return date;
            });

            if (userAssignment.name === assignmentName) {
              return {
                name: assignmentName,
                dates: updatedDates,
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

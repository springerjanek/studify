import { useGetDueAssignmentsDates } from "../hooks/useGetDueAssignmentDates";
import { useGetFormattedDate } from "../hooks/useGetFormattedDate";
import { Assignments } from "./Dashboard";
import { UserScheduleResponse } from "../data-access/getUserSchedule.query";

export const CalendarTile = ({
  date,
  assignments,
  schedule,
}: {
  date: Date;
  assignments: Assignments | undefined;
  schedule: UserScheduleResponse | undefined;
}) => {
  const { formattedDate } = useGetFormattedDate(date);
  
  const dueAssigmentDates = assignments
    ? useGetDueAssignmentsDates(assignments)
    : [];

  return (
    <>
      {schedule?.workingDates.includes(formattedDate) &&
      !dueAssigmentDates.includes(formattedDate)
        ? "💡"
        : null}
      {dueAssigmentDates.includes(formattedDate) ? "📑" : null}
    </>
  );
};

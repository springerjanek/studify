import { Assignments } from "../components/Dashboard";

export const useNotify = ({
  user_assignments,
  useGetFormattedDate,
 toast
}: {
  user_assignments: Assignments | undefined;
  useGetFormattedDate: any;
  toast: any
}) => {
  const notifyNextDay = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const { formattedDate: tomorrowsDate } = useGetFormattedDate(date);

    if (user_assignments) {
      const nextDayAssignments = user_assignments
        .filter((assignment) => assignment.dueDate === tomorrowsDate)
        .map((assignment) => assignment.name);

      if (nextDayAssignments.length > 0) {
        const assignmentsList = nextDayAssignments.map(
          (nextDayAssignment, index) => `${index + 1}. ${nextDayAssignment}`
        );
        toast({
          title: `You have assignments for the next day: ${assignmentsList.join(
            " "
          )}`,
          className: "text-black",
        });
      }
    }
  };

  const notifyUpcoming = () => {
    const todaysDate = new Date();

    if (user_assignments) {
      const upcomingAssignments = user_assignments
        .filter((assignment) => {
          const splittedDate = assignment.dueDate.split(".");
          const [day, month, year] = splittedDate;
          const formattedDate = `${month}/${day}/${year}`;

          const assignmentDueDate = new Date(formattedDate);
          const timeDiff = todaysDate.getTime() - assignmentDueDate.getTime();

          return timeDiff <= 0;
        })
        .map((assignment) => assignment.name);

      if (upcomingAssignments.length > 0) {
        const assignmentsList = upcomingAssignments.map(
          (upcomingAssignment, index) => `${index + 1}. ${upcomingAssignment}`
        );
        toast({
          title: `You have upcoming assignments: ${assignmentsList.join(" ")}`,
          className: "text-black",
        });
      }
    }
  };

  return { notifyNextDay, notifyUpcoming };
};

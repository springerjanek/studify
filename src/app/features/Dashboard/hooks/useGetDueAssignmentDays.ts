import { Assignment } from "../components/Dashboard";

export const useGetDueAssignmentsDays = (assignments: Assignment[]) => {
  let dueAssignmentsDays: number[] = [];
  assignments.map((assignment) => {
    const dayFromDueDate = assignment.dueDate.split("-")[2];
    dueAssignmentsDays.push(Number(dayFromDueDate));
  });
  return dueAssignmentsDays;
};

import { Assignments } from "../../components/Dashboard";

export const useGetDueAssignmentsDates = (assignments: Assignments) => {
  const dueAssignmentsDates = assignments.map((assignment) => {
    return assignment.dueDate;
  });
  return dueAssignmentsDates;
};

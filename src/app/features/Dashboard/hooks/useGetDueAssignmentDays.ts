import { Assignment } from "../components/Dashboard";
import dayjs from "dayjs";

export const useGetDueAssignmentsDays = (assignments: Assignment[]) => {
  let dueAssignmentsDays: number[] = [];
  assignments.map((assignment) => {
    const day = dayjs(assignment.dueDate).date();
    dueAssignmentsDays.push(day);
  });
  return dueAssignmentsDays;
};

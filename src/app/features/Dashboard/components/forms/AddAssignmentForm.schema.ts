import * as Yup from "yup";

export const addAssignmentSchema = Yup.object({
  assignmentName: Yup.string()
    .min(3, "Assignment must be longer than 3 characters")
    .required("Fill the assignment name"),
  dueDate: Yup.date().required("Fill the due date"),
});

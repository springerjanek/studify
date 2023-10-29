import * as Yup from "yup";

export const profileSchema = Yup.object({
  name: Yup.string()
    .min(3, "Assignment must be longer than 2 characters")
    .required("Fill the assignment name"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
});

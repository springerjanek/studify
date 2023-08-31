import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAssignmentSchema } from "./AddAssignmentForm.schema";
import { Label } from "@shared/ui/Form/Label";
import { Input } from "@shared/ui/Form/Input/Input";
import { Form } from "@shared/ui/Form/Form";
import { Button } from "@shared/ui/Button/Button";
import { Error } from "@shared/ui/Form/Error";

export type AssignmentFormValues = {
  assignmentName: string;
  dueDate: Date;
};

export const AddAssignmentForm = ({
  onSubmit,
  loading
}: {
  onSubmit: (data: AssignmentFormValues) => void;
  loading: boolean
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AssignmentFormValues>({
    resolver: yupResolver(addAssignmentSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="assignment">
        <p>Assignment</p>
      </Label>
      <Error>{errors.assignmentName?.message}</Error>
      <Input
        id="assignment"
        register={register("assignmentName")}
        type="text"
        placeholder="Assignment Name"
      />
      <Label htmlFor="dueDate">
        <p>Due Date</p>
      </Label>
      <Error>
        {errors.dueDate?.type === "typeError"
          ? "Fill in the due date"
          : errors.dueDate?.message}
      </Error>
      <Input
        id="dueDate"
        register={register("dueDate")}
        type="date"
        placeholder="Date"
        width="30%"
      />
      <Button style={{ marginTop: "25px" }} type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
};

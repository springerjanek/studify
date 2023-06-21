import { useAuth } from "@shared/utils/auth";
import { styled } from "styled-components";
import { Heading } from "../../../shared/ui/Heading/Heading";
import { AddAssignmentForm, AssignmentFormValues } from "./AddAssignmentForm";
import { supabase } from "../../../supabase";

const ModalContainer = styled.div`
  height: 500px;
  width: 500px;
  text-align: center;
  border-radius: 15px;
  background-color: #949292;
`;

export const AddAssignmentModal = () => {
  const { currentUser } = useAuth();

  const onSubmit = async (data: AssignmentFormValues) => {
    const dateWithoutTimestamp =
      data.dueDate.getFullYear() +
      "/" +
      (data.dueDate.getMonth() + 1) +
      "/" +
      data.dueDate.getDate();

    const { data: insert, error } = await supabase.from("assignments").insert({
      user_id: currentUser?.id,
      name: data.assignmentName,
      dueDate: dateWithoutTimestamp,
    });
    if (error) {
      throw error;
    }
    // notify success
  };

  return (
    <ModalContainer>
      <Heading>Add your assignment!</Heading>
      <AddAssignmentForm onSubmit={onSubmit} />
    </ModalContainer>
  );
};

import { useAuth } from "@shared/utils/auth";
import { styled } from "styled-components";
import { AddAssignmentForm, AssignmentFormValues } from "../AddAssignmentForm";
import { Heading } from "@shared/ui/Heading";
import { supabase } from "../../../../supabase";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalContainer = styled.div`
  height: 500px;
  width: 500px;
  text-align: center;
  border-radius: 15px;
  background-color: white;
  color: #6f48eb;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const AddAssignmentModal = ({
  showModal,
}: {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
      <HeadingContainer>
        <Heading>Add your assignment!</Heading>
        <IconButton
          onClick={() => showModal(false)}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <CloseIcon sx={{ color: "black" }} />
        </IconButton>
      </HeadingContainer>
      <AddAssignmentForm onSubmit={onSubmit} />
    </ModalContainer>
  );
};

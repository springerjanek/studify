import { useState } from "react";
import {
  AddAssignmentForm,
  AssignmentFormValues,
} from "../../../forms/AddAssignmentForm";
import { Heading } from "@shared/ui/Heading";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ModalContainer, HeadingContainer } from "./AddAssignment.styled";
import { handleFormSubmit } from "./formSubmitHandler";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/app/shared/utils/auth";

export const AddAssignmentModal = ({
  showModal,
}: 
{
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();

    const { toast } = useToast();

    const { currentUser } = useAuth();

  const onSubmit = async (data: AssignmentFormValues) => {
    await handleFormSubmit({data, queryClient, toast, currentUser, setLoading, showModal})
  };

  return (
    <ModalContainer>
      <HeadingContainer>
        <Heading>Add assignment!</Heading>
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
      {loading && <h3>Proccessing your work plan...</h3>}
      <AddAssignmentForm onSubmit={onSubmit} />
    </ModalContainer>
  );
};

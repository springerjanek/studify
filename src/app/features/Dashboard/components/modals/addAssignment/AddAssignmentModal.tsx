import { useState } from "react";
import {
  AddAssignmentForm,
  AssignmentFormValues,
} from "../../forms/AddAssignmentForm";
import { Heading } from "@shared/ui/Heading";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HeadingContainer, ModalContainer } from "../Modals.styled";
import { handleFormSubmit } from "./formSubmitHandler";

export const AddAssignmentModal = ({
  showModal,
}: 
{
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AssignmentFormValues) => {
    await handleFormSubmit({data, setLoading, showModal})
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
      {loading && <h3>Proccessing your work plan...</h3>}
      <AddAssignmentForm onSubmit={onSubmit} />
    </ModalContainer>
  );
};

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/app/shared/utils/auth";
import { useQueryClient } from "@tanstack/react-query";
import {
  AddAssignmentForm,
  AssignmentFormValues,
} from "../../forms/AddAssignmentForm";
import { handleFormSubmit } from "../../forms/formSubmitHandler";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ModalContainer, HeadingContainer } from "./AddAssignment.styled";
import { Heading } from "@shared/ui/Heading";

export const AddAssignmentModal = ({
  showModal,
}: {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { currentUser } = useAuth();

  const onSubmit = async (data: AssignmentFormValues) => {

    const passedDueDateIsToday =
      data.dueDate.toDateString() === new Date().toDateString();
    const passedDueDateIsInThePast =
      new Date().getTime() - data.dueDate.getTime() > 0;

    if (passedDueDateIsToday || passedDueDateIsInThePast) {
      toast({
        title: "Due date can not be due the past or today",
        className: "text-red-500",
      });
    } else {
      await handleFormSubmit({
        data,
        queryClient,
        toast,
        currentUser,
        setLoading,
        showModal,
      });
    }
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
      {loading && (
        <h3 className="text-center">Proccessing your work plan...</h3>
      )}
      <AddAssignmentForm onSubmit={onSubmit} loading={loading} />
    </ModalContainer>
  );
};

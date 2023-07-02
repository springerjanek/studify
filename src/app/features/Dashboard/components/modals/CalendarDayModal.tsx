import { styled } from "styled-components";
import { Heading } from "@shared/ui/Heading";
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

export const CalendarDayModal = ({
  showModal,
  data,
}: {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: { date: Date };
}) => {
  return (
    <ModalContainer>
      <Heading>Your day: {data.date.toDateString()}</Heading>
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
    </ModalContainer>
  );
};

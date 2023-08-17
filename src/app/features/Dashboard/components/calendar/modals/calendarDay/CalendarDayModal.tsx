import { useGetUserSchedule } from "../../../../data-access/getUserSchedule.query";
import { useGetFormattedDate } from "../../../../hooks/useGetFormattedDate";
import { DayTimeline } from "./DayTimeline";
import { timeFramesData } from "../../timeFramesData";
import { Heading } from "@shared/ui/Heading";
import { HeadingContainer, ModalWrapper } from "./calendarDay.styled";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const CalendarDayModal = ({
  showModal,
  data,
}: {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: { date: Date; userId: string };
}) => {
  const { data: user_schedule } = useGetUserSchedule(data.userId);
  const { formattedDate } = useGetFormattedDate(data.date);

  const filteredAssignments =
    user_schedule?.user_schedule[0].data.assignments.filter((assignment) => {
      return assignment.dates.some((date) => {
        const [datePart, timeFrame] = date.split(": ");
        return (
          datePart === formattedDate && timeFramesData.includes(timeFrame)
        );
      });
    });

  return (
      <ModalWrapper>
        <HeadingContainer>
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
        </HeadingContainer>

        <DayTimeline
          filteredAssignments={filteredAssignments}
          formattedDate={formattedDate}
          userId={data.userId}
          user_schedule={user_schedule?.user_schedule}
        />
      </ModalWrapper>
  );
};

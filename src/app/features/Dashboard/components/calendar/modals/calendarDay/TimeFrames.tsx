import { useFindBestTimeFrame } from "@/app/features/Dashboard/hooks/useFindBestTimeFrame";
import { timeFramesData } from "../../timeFramesData";
import {
  TimeFramesContainer,
  TimeFrame,
} from "./calendarDay.styled";
import { Droppable } from "react-beautiful-dnd";
import { DraggableAssignment } from "./DraggableAssignment";

export const TimeFrames = ({
  assignments,
  currentDayDate,
}: {
  assignments:
    | {
        name: string;
        dates: string[];
      }[]
    | undefined;
  currentDayDate: string;
}) => {
  return (
    <TimeFramesContainer>
      {timeFramesData.map((timeFrame, index) => {
        const frameMatchingAssignments =
          assignments &&
          assignments.filter((assignment) => {
            return assignment.dates.some((dateWithTimeFrame) => {
              const [datePart] = dateWithTimeFrame.split(": ");
              const bestTimeFrame = useFindBestTimeFrame(dateWithTimeFrame);
              return bestTimeFrame === timeFrame && datePart === currentDayDate;
            });
          });

        return (
          <TimeFrame key={index}>
            <p>{timeFrame}</p>
            <Droppable droppableId={timeFrame} >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex align-center text-center w-full p-1"
                  style={{
                    border: "1px solid black",
                  }}
                >
                 <DraggableAssignment frameMatchingAssignments={frameMatchingAssignments} currentDayDate={currentDayDate} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </TimeFrame>
        );
      })}
    </TimeFramesContainer>
  );
};

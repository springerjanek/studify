import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DraggableWrapper } from "./calendarDay.styled";
import { TimePicker } from "../TimePicker";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const DraggableAssignment = ({
  frameMatchingAssignments,
  currentDayDate,
}: {
  frameMatchingAssignments:
    | {
        name: string;
        dates: string[];
      }[]
    | undefined;
  currentDayDate: string;
}) => {
  const [editTimeRange, setEditTimeRange] = useState(false);

  const closeEdit = () => {
    setEditTimeRange(false);
  };
  return (
    <>
      {frameMatchingAssignments &&
        frameMatchingAssignments.map((matchingAssignment, index) => {
          const matchingDate = matchingAssignment.dates.find((date) => {
            const [datePart] = date.split(": ");
            return datePart === currentDayDate;
          });
          const splittedDate = matchingDate && matchingDate.split(": ");

          const matchingTimeFrame = splittedDate && splittedDate[1];
          return (
            <Draggable
              key={matchingAssignment.name}
              draggableId={matchingAssignment.name || "empty"}
              index={index}
            >
              {(provided) => (
                <DraggableWrapper
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    display: `${matchingAssignment ? "block" : "none"}`,
                    ...provided.draggableProps.style,
                  }}
                >
                  {matchingAssignment.name} {""}
                  {matchingTimeFrame}
                  <EditOutlinedIcon
                    className="w-1 h-1"
                    onClick={() => setEditTimeRange(true)}
                  />
                  {editTimeRange && (
                    <TimePicker
                      timeFrame={matchingTimeFrame!}
                      assignmentName={matchingAssignment.name}
                      assignmentDate={matchingDate}
                      closeEdit={closeEdit}
                    />
                  )}
                </DraggableWrapper>
              )}
            </Draggable>
          );
        })}
    </>
  );
};

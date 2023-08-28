import { Draggable } from 'react-beautiful-dnd';
import { DraggableWrapper } from './calendarDay.styled';

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
  return (
    <>
      {frameMatchingAssignments &&
        frameMatchingAssignments.map((matchingAssignment) => {
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
              index={0}
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
                  {matchingAssignment.name} {matchingTimeFrame}
                </DraggableWrapper>
              )}
            </Draggable>
          );
        })}
    </>
  );
};

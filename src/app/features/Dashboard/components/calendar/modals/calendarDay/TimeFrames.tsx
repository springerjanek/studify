import  {timeFramesData} from "../../timeFramesData"
import {
  TimeFramesContainer,
  TimeFrame,
  DraggableWrapper,
} from "./calendarDay.styled";
import { Draggable, Droppable } from "react-beautiful-dnd";

export const TimeFrames = ({
  assignments,
  formattedDate,
}: {
  assignments:
    | {
        name: string;
        dates: string[];
      }[]
    | undefined;
  formattedDate: string;
}) => {
  return (
    <TimeFramesContainer>
      {timeFramesData.map((timeFrame, index) => {
        const matchingAssignment =
          assignments &&
          assignments.find((assignment) =>
            assignment.dates.includes(`${formattedDate}: ${timeFrame}`)
          );

        return (
          <TimeFrame key={index}>
            <p>{timeFrame}</p>
            <Droppable droppableId={timeFrame}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    border: "1px solid black",
                  }}
                >
                  <Draggable
                    key={matchingAssignment?.name}
                    draggableId={matchingAssignment?.name || "empty"}
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
                        <p>{matchingAssignment?.name}</p>
                      </DraggableWrapper>
                    )}
                  </Draggable>
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

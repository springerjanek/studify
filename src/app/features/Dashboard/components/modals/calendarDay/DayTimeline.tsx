import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useUpdateUserSchedule } from "../../../data-access/mutations/updateUserSchedule.mutation";
import { UserSchedule } from "../../../data-access/getUserSchedule.query";
import { timeFrames } from "./timeFrames";
import { TimeFramesContainer, TimeFrame, DraggableWrapper } from "../Modals.styled";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const DayTimeline = ({
  filteredAssignments,
  formattedDate,
  userId,
  user_schedule,
}: {
  filteredAssignments: {
        name: string;
        dates: string[];
      }[] | undefined;
  formattedDate: string;
  userId: string;
  user_schedule: UserSchedule[] | undefined;
}) => {
  const [assignments, setAssignments] = useState(filteredAssignments);

  const { mutate: updateUserSchedule } = useUpdateUserSchedule();

 const debouncedUpdate = useDebounce(() => {
    updateUserSchedule({ user_schedule, userId, assignments });
 })

  const onDropHandler = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const today = formattedDate;

    const updatedAssignments =
      assignments &&
      assignments.map((assignment) => {
        if (assignment.name === draggableId) {
          const desiredDate = assignment.dates.filter(
            (date) => date.split(":")[0] === today
          )[0];

          const updatedTimeFrame = destination.droppableId;

          const updatedDates = assignment.dates.map((date) =>
            date === desiredDate ? today + `: ${updatedTimeFrame}` : date
          );

          return { ...assignment, dates: updatedDates };
        } else {
          return assignment;
        }
      });

    setAssignments(updatedAssignments);
    debouncedUpdate()
  };



  return (
    <DragDropContext onDragEnd={(result) => onDropHandler(result)}>
      <TimeFramesContainer>
        {timeFrames.map((timeFrame, index) => {
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
    </DragDropContext>
  );
};

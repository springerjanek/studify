import { useEffect, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useUpdateUserSchedule } from "../../../../data-access/mutations/updateUserSchedule.mutation";
import { UserSchedule } from "../../../../data-access/getUserSchedule.query";
import { DragDropContext } from "react-beautiful-dnd";
import { TimeFrames } from "./TimeFrames";

export const DayTimeline = ({
  assignments,
  currentDayDate,
  userId,
  user_schedule,
}: {
  assignments:
    | {
        name: string;
        dates: string[];
      }[]
    | undefined;
  currentDayDate: string;
  userId: string;
  user_schedule: UserSchedule[] | undefined;
}) => {
  const [userAssignments, setUserAssignments] = useState(assignments);
  const { mutate: updateUserSchedule } = useUpdateUserSchedule();

  useEffect(() => {
    setUserAssignments(assignments);
  }, [assignments]);

  const debouncedUpdate = useDebounce(() => {
    updateUserSchedule({ user_schedule, userId, userAssignments });
  });

  const onDropHandler = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const updatedAssignments =
      userAssignments &&
      userAssignments.map((assignment) => {
        if (assignment.name === draggableId) {
          const desiredDate = assignment.dates.filter(
            (date) => date.split(":")[0] === currentDayDate
          )[0];

          const updatedTimeFrame = destination.droppableId;

          const updatedDates = assignment.dates.map((date) =>
            date === desiredDate
              ? currentDayDate + `: ${updatedTimeFrame}`
              : date
          );

          return { ...assignment, dates: updatedDates };
        } else {
          return assignment;
        }
      });

    setUserAssignments(updatedAssignments);
    debouncedUpdate();
  };

  return (
    <DragDropContext onDragEnd={(result) => onDropHandler(result)}>
      <TimeFrames
        assignments={userAssignments}
        currentDayDate={currentDayDate}
      />
    </DragDropContext>
  );
};

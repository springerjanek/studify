import { useState } from "react";
import { useGetDueAssignmentsDays } from "../hooks/useGetDueAssignmentDays";
import { useGetUserAssignments } from "../hooks/useGetUserAssignments";
import { useAuth } from "@shared/utils/auth";
import { AddAssignmentModal } from "./modals/AddAssignmentModal";
import { CalendarDayModal } from "./modals/CalendarDayModal";
import { AssignmentsContainer, AssignmentsWrapper } from "./Dashboard.styled";
import { Container } from "./Dashboard.styled";
import { Button } from "@shared/ui/Button/Button";
import { supabase } from "../../../supabase";
import Calendar from "react-calendar";

export type Assignment = {
  id: number;
  name: string;
  dueDate: string;
};

export const Dashboard = () => {
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showCalendarDayModal, setShowCalendarDayModal] = useState(false);
  const [dataToDayModal, setDataToDayModal] = useState({ date: new Date() });

  const { currentUser } = useAuth();

  const { data: assignments } = useGetUserAssignments(currentUser!.id);

  const highlightedDays = assignments && useGetDueAssignmentsDays(assignments);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const handleClickDay = (clickedDay: Date) => {
    const clickedDayIsHighlighted =
      highlightedDays && highlightedDays.includes(clickedDay.getDate());
    setDataToDayModal({ date: clickedDay });
    setShowCalendarDayModal(true);
  };

  return (
    <>
      <h1>Logged in!</h1>
      <Button onClick={handleLogout}>Log Out</Button>

      <Container>
        <AssignmentsContainer>
          <AssignmentsWrapper>
            {assignments &&
              assignments.map((assignment) => {
                return (
                  <div key={assignment.id}>
                    <p>{assignment.name}</p>
                    <p>{assignment.dueDate}</p>
                  </div>
                );
              })}
          </AssignmentsWrapper>
          <Button onClick={() => setShowAssignmentModal(true)}>
            Add Assignment
          </Button>
        </AssignmentsContainer>

        {showAssignmentModal && (
          <AddAssignmentModal showModal={setShowAssignmentModal} />
        )}

        {showCalendarDayModal && (
          <CalendarDayModal
            showModal={setShowCalendarDayModal}
            data={dataToDayModal}
          />
        )}
        <Calendar
          onClickDay={(value) => handleClickDay(value)}
          showNeighboringMonth={false}
          tileContent={({ date }) =>
            highlightedDays && highlightedDays.includes(date.getDate())
              ? "💡"
              : null
          }
          view="month"
          locale="en-EN"
        />
      </Container>
    </>
  );
};

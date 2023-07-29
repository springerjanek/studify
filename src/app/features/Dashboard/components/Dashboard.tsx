import { useState } from "react";
import { useGetUserAssignments } from "../data-access/getUserAssignments.query";
import { useGetUserSchedule } from "../data-access/getUserSchedule.query";
import { useAuth } from "@shared/utils/auth";
import { AddAssignmentModal } from "./modals/addAssignment/AddAssignmentModal";
import { CalendarDayModal } from "./modals/calendarDay/CalendarDayModal";
import { CalendarTile } from "./CalendarTile";
import Calendar from "react-calendar";
import {
  AssignmentsContainer,
  AssignmentsWrapper,
} from "./Dashboard.styled";
import { Container } from "./Dashboard.styled";
import { Button } from "@shared/ui/Button/Button";
import { supabase } from "../../../supabase";

type Assignment = {
  id: number;
  name: string;
  dueDate: string;
};

export type Assignments = Assignment[];

export const Dashboard = () => {
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showCalendarDayModal, setShowCalendarDayModal] = useState(false);
  const [dataToDayModal, setDataToDayModal] = useState({
    date: new Date(),
    userId: "",
  });

  const { currentUser } = useAuth();

  const { data: user_assignments } = useGetUserAssignments(currentUser!.id);
  const { data: user_schedule } = useGetUserSchedule(currentUser!.id);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleAddAssignment = () => {
    setShowAssignmentModal(true);
    setShowCalendarDayModal(false)
  }

  const handleClickDay = (clickedDay: Date) => {
    setDataToDayModal({ date: clickedDay, userId: currentUser!.id });
    setShowCalendarDayModal(true);
    setShowAssignmentModal(false)
  };

  return (
    <div>
      <Button onClick={handleLogout}>Log Out</Button>

      <Container>
        <AssignmentsContainer>
          <AssignmentsWrapper>
            {user_assignments &&
              user_assignments.map((assignment) => {
                return (
                  <div key={assignment.id}>
                    <p>{assignment.name}</p>
                    <p>{assignment.dueDate}</p>
                  </div>
                );
              })}
          </AssignmentsWrapper>
          <Button onClick={handleAddAssignment}>
            Add Assignment
          </Button>
        </AssignmentsContainer>

        {showAssignmentModal && (
          <AddAssignmentModal
            showModal={setShowAssignmentModal}
          />
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
          tileContent={({ date }) => (
            <CalendarTile
              date={date}
              assignments={user_assignments}
              schedule={user_schedule}
            />
          )}
          view="month"
          locale="en-EN"
        />
      </Container>
    </div>
  );
};

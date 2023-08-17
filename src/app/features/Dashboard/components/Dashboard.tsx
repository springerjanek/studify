import { useState } from "react";
import { useGetUserAssignments } from "../data-access/getUserAssignments.query";
import { useGetUserSchedule } from "../data-access/getUserSchedule.query";
import { useAuth } from "@shared/utils/auth";
import Calendar from "react-calendar";
import { CalendarDayModal } from "./calendar/modals/calendarDay/CalendarDayModal";
import { CalendarTile } from "./calendar/CalendarTile";
import { AssignmentsList } from "./assignments/AssignmentsList";
import { Container } from "./Dashboard.styled";
import { Button } from "@shared/ui/Button/Button";
import { supabase } from "../../../supabase";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";
import { ModalContainer } from "./calendar/modals/calendarDay/calendarDay.styled";

type Assignment = {
  id: number;
  name: string;
  dueDate: string;
};

export type Assignments = Assignment[];

export const Dashboard = () => {
  const [showCalendarDayModal, setShowCalendarDayModal] = useState(false);
  const [dataToDayModal, setDataToDayModal] = useState({
    date: new Date(),
    userId: "",
  });

  const { currentUser } = useAuth();

  const { data: user_assignments } = useGetUserAssignments(currentUser!.id);
  const { data: user_schedule } = useGetUserSchedule(currentUser!.id);

 
  const handleClickDay = (clickedDay: Date) => {
    setDataToDayModal({ date: clickedDay, userId: currentUser!.id });
    setShowCalendarDayModal(true);
  };

  return (
    <div className={`${showCalendarDayModal ? "blur" : ""}`}>
      <DashboardLayout>
        <Container>
          <AssignmentsList user_assignments={user_assignments} />

          {showCalendarDayModal && (
            <ModalContainer
              className={`${showCalendarDayModal ? "not-blur" : ""}`}
            >
              <CalendarDayModal
                showModal={setShowCalendarDayModal}
                data={dataToDayModal}
              />
            </ModalContainer>
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
      </DashboardLayout>
    </div>
  );
};

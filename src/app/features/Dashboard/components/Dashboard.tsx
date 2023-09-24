import { useGetUserAssignments } from "../data-access/getUserAssignments.query";
import { useGetUserSchedule } from "../data-access/getUserSchedule.query";
import { useAuth } from "@shared/utils/auth";
import { useCalendarModal } from "@/app/shared/utils/calendarModal";
import Calendar from "react-calendar";
import { CalendarDayModal } from "./calendar/modals/calendarDay/CalendarDayModal";
import { CalendarTile } from "./calendar/CalendarTile";
import { AssignmentsList } from "./assignments/AssignmentsList";
import { Container } from "./Dashboard.styled";
import { ModalContainer } from "./calendar/modals/calendarDay/calendarDay.styled";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";

type Assignment = {
  id: number;
  name: string;
  dueDate: string;
};

export type Assignments = Assignment[];

export const Dashboard = () => {
  const {
    showCalendarDayModal,
    setShowCalendarDayModal,
    dataToDayModal,
    handleOpenCalendarDayModal,
  } = useCalendarModal();

  const { currentUser } = useAuth();

  const { data: user_assignments } = useGetUserAssignments(currentUser!.id);
  const { data: user_schedule } = useGetUserSchedule(currentUser!.id);

  return (
    <DashboardLayout>
      <Container>
        <AssignmentsList user_assignments={user_assignments} />

        {showCalendarDayModal && (
          <ModalContainer>
            <CalendarDayModal
              showModal={setShowCalendarDayModal}
              data={dataToDayModal}
            />
          </ModalContainer>
        )}

        <Calendar
          onClickDay={(value) =>
            handleOpenCalendarDayModal({ date: value, userId: currentUser.id })
          }
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
  );
};

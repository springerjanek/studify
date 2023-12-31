import { useEffect, useRef } from "react";
import { useGetUserAssignments } from "../data-access/getUserAssignments.query";
import { useGetUserSchedule } from "../data-access/getUserSchedule.query";
import { useGetUserNotiPreferences } from "../data-access/getUserNotiPreferences.query";
import { useNotify } from "../hooks/useNotify";
import { useGetFormattedDate } from "../hooks/useGetFormattedDate";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@shared/utils/auth";
import { useCalendarModal } from "@/app/shared/utils/calendarModal";
import Calendar from "react-calendar";
import { CalendarDayModal } from "./calendar/modals/calendarDay/CalendarDayModal";
import { CalendarTile } from "./calendar/CalendarTile";
import { AssignmentsList } from "./assignments/AssignmentsList";
import { Container, UserNavContainer } from "./Dashboard.styled";
import { ModalContainer } from "./calendar/modals/calendarDay/calendarDay.styled";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";
import { UserNav } from "./user/UserNav";

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

  const { data: user_assignments } = useGetUserAssignments(currentUser.id);
  const { data: user_schedule } = useGetUserSchedule(currentUser.id);
  const { data: noti_preferences } = useGetUserNotiPreferences(currentUser.id);

  const { toast } = useToast();

  const { notifyUpcoming, notifyNextDay } = useNotify({
    user_assignments,
    useGetFormattedDate,
    toast,
  });

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      if (noti_preferences && noti_preferences[0].notifications.noti_nextDay) {
        notifyNextDay();
      }

      if (noti_preferences && noti_preferences[0].notifications.noti_upcoming) {
        notifyUpcoming();
      }
    } else {
      isMounted.current = true;
    }
  }, [noti_preferences]);

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
      
      <UserNavContainer>
      <UserNav />
      </UserNavContainer>
    </DashboardLayout>
  );
};

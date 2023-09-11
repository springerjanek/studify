import { ReactNode } from "react";
import { DashboardNavbar } from "./components/DashboardNavbar";
import { LayoutContainer } from "./components/DashboardNavbar.styled";

export const DashboardLayout = ({
  children,
  setShowCalendarDayModal
}: {
  children: ReactNode;
  setShowCalendarDayModal: (clickedDay: Date) => void; 
}) => {
  return (
    <LayoutContainer>
      <DashboardNavbar setShowCalendarDayModal={setShowCalendarDayModal}/>
      {children}
    </LayoutContainer>
  );
};

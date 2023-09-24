import { ReactNode } from "react";
import { DashboardNavbar } from "./components/DashboardNavbar";
import { LayoutContainer } from "./components/DashboardNavbar.styled";

export const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <LayoutContainer>
      <DashboardNavbar/>
      {children}
    </LayoutContainer>
  );
};

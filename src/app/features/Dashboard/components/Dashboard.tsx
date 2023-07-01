import { useState } from "react";
import { useGetDueAssignmentsDays } from "../hooks/useGetDueAssignmentDays";
import { useGetUserAssignments } from "../hooks/useGetUserAssignments";
import { useAuth } from "@shared/utils/auth";
import { supabase } from "../../../supabase";
import { AddAssignmentModal } from "./AddAssignmentModal";
import { HighlightedCalendarDay } from "./HighlightedCalendarDay";
import { AssignmentsContainer, AssignmentsWrapper } from "./Dashboard.styled";
import { Container } from "./Dashboard.styled";
import { Button } from "@shared/ui/Button/Button";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export type Assignment = {
  id: number;
  name: string;
  dueDate: string;
};

export const Dashboard = () => {
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));

  const { currentUser } = useAuth();

  const { data: assignments } = useGetUserAssignments(currentUser!.id);

  const highlightedDays = assignments && useGetDueAssignmentsDays(assignments);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <DateCalendar
          sx={{
            width: { xs: "100%", sm: "400px" },
            margin: "0",
            backgroundColor: "white",
            color: "black",
          }}
          views={["day"]}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slots={{ day: HighlightedCalendarDay }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
        />
      </Container>
    </LocalizationProvider>
  );
};

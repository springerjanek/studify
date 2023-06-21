import { useState, useEffect } from "react";
import { useAuth } from "@shared/utils/auth";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../../supabase";
import {
  AssignmentsContainer,
  AssignmentsWrapper,
  StyledDateCalendar,
} from "./Dashboard.styled";
import { Container } from "./Dashboard.styled";
import { Button } from "@shared/ui/Button/Button";
import { AddAssignmentModal } from "./AddAssignmentModal";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Assignment = {
  id: number;
  name: string;
  dueDate: Date;
};

export const Dashboard = () => {
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const { session, currentUser } = useAuth();

  // move this to react query

  const getUserAssignments = async () => {
    const { data: user_assignments, error } = await supabase
      .from("assignments")
      .select("*")
      .eq("user_id", currentUser?.id);

    if (error) {
      throw error;
    }
    setAssignments(user_assignments);
  };

  useEffect(() => {
    if (currentUser) {
      getUserAssignments();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1>Logged in!</h1>
        <button onClick={handleLogout}>LOG OUT</button>

        <Container>
          <AssignmentsContainer>
            <AssignmentsWrapper>
              {assignments &&
                assignments.map((assignment) => {
                  return (
                    <div key={assignment.id}>
                      <p>{assignment.name}</p>
                      <p>{assignment.dueDate.toString()}</p>
                    </div>
                  );
                })}
            </AssignmentsWrapper>
            <Button onClick={() => setShowAssignmentModal(true)}>
              Add Assignment
            </Button>
          </AssignmentsContainer>

          {showAssignmentModal && <AddAssignmentModal />}

          <StyledDateCalendar
            sx={{ width: "400px", margin: "0" }}
            views={["day"]}
          />
        </Container>
      </LocalizationProvider>
    );
  }
};

import { useState } from "react";
import { Assignments } from "../Dashboard";
import { AssignmentsContainer, AssignmentsWrapper } from "./Assignments.styled";
import { Button } from "@shared/ui/Button/Button";
import { AssignmentCard } from "./AssignmentCard";
import { AddAssignmentModal } from "./modals/addAssignment/AddAssignmentModal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const AssignmentsList = ({
  user_assignments,
}: {
  user_assignments: Assignments | undefined;
}) => {
  const [expandAssigments, setExpandAssignments] = useState(false);
  const [showAddAssignment, setShowAddAssignment] = useState(false);

  const handleAddAssignment = () => {
      setShowAddAssignment(!showAddAssignment);
      setExpandAssignments(!expandAssigments);
  };

  const handleExpandLessAssignments = () => {
    setExpandAssignments(false);
    setShowAddAssignment(false);
  };

  return (
    <AssignmentsContainer>
      <Button $primary onClick={handleAddAssignment}>
        Add Assignment
      </Button>
      <div className="absolute right-2 top-5">
        {!expandAssigments ? (
          <ExpandMoreIcon
            className="w-10 h-10"
            onClick={() => setExpandAssignments(true)}
          />
        ) : (
          <ExpandLessIcon
            className="w-10 h-10"
            onClick={handleExpandLessAssignments}
          />
        )}
      </div>
      {user_assignments && expandAssigments && (
        <AssignmentsWrapper>
          {user_assignments.map((assignment) => {
            return (
              <AssignmentCard
                key={assignment.id}
                name={assignment.name}
                dueDate={assignment.dueDate}
              />
            );
          })}
        </AssignmentsWrapper>
      )}

      {showAddAssignment && (
        <AddAssignmentModal showModal={setShowAddAssignment} />
      )}
    </AssignmentsContainer>
  );
};

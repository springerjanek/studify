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
  const [expandAssignments, setExpandAssignments] = useState(false);
  const [showAddAssignment, setShowAddAssignment] = useState(false);

  const handleAddAssignment = () => {
      setShowAddAssignment(!showAddAssignment);
      setExpandAssignments(!expandAssignments);
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
        {!expandAssignments ? (
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
      {expandAssignments && (
        <>
          {user_assignments && user_assignments.length > 0 && (
            <AssignmentsWrapper>
              {user_assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  name={assignment.name}
                  dueDate={assignment.dueDate}
                />
              ))}
            </AssignmentsWrapper>
          )}

          {user_assignments?.length === 0 && (
            <h3>Add assignments to get started!</h3>
          )}
        </>
      )}

      {showAddAssignment && (
        <AddAssignmentModal showModal={setShowAddAssignment} />
      )}
    </AssignmentsContainer>
  );
};

import { fireEvent, render, screen } from "../../../../testsUtils";
import { describe, expect, it } from "vitest";

import { AssignmentsList } from "./AssignmentsList";

const user_assignments = [
  {
    id: 1,
    name: "test",
    dueDate: "09.10.2023",
  },
];

describe("AssignmentsList component", () => {
  it("correctly shows expanded empty list", async () => {
    render(<AssignmentsList user_assignments={[]} />);

    const expandIcon = screen.getByTestId("ExpandMoreIcon");
    fireEvent.click(expandIcon);

    const noAssignmentsText = screen.getByText("Add assignments to get started!");

    expect(noAssignmentsText).toBeVisible();
  });

  it("correctly shows expanded assignments", async () => {
    render(<AssignmentsList user_assignments={user_assignments} />);

    const expandIcon = screen.getByTestId("ExpandMoreIcon");
    fireEvent.click(expandIcon);

    const assignmentName = screen.getByText("test");
    const assignmentDueDate = screen.getByText("09.10.2023");
    
    expect(assignmentName).toBeVisible();
    expect(assignmentDueDate).toBeVisible();
  });
});

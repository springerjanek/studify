import { supabase } from "./supabase.ts";

export async function generatePrompt({
  assignment,
  dueDate,
  user_id,
}: {
  assignment: string;
  dueDate: string;
  user_id: string;
}) {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const currentDate = [
    ("0" + day).slice(-2),
    ("0" + month).slice(-2),
    year,
  ].join(".");
  const currentHour = date.getHours() % 12 || 12;

  const prefferedTime = "3-4";

  let userAlreadyHaveWorkPlan = false;
  let prompt = "";

  prompt += `Assignments:\n- [${assignment}]: Due on [${dueDate}]\n`;

  const { data: goingAssignments, error } = await supabase
    .from("assignments")
    .select("*")
    .eq("user_id", user_id)
    .neq("name", assignment);

  if (error) {
    throw error;
  }

  if (goingAssignments.length > 0) {
    userAlreadyHaveWorkPlan = true;
    prompt += "Going on assignments:\n";
    goingAssignments.map((assignment) => {
      prompt += `- [${assignment.name}]: Due on [${assignment.dueDate}]\n`;
    });
    prompt +=
      `Current Time: ${currentHour}\n` +
      `Preffered Time: ${prefferedTime}\n` +
      `Please create a schedule between today: ${currentDate}, and the day before the due date for each assignment, considering the user's preferred time and the due dates\n END`;
  }

  if (goingAssignments.length === 0) {
    prompt +=
      `Current Time: ${currentHour}\n` +
      `Preffered Time: ${prefferedTime}\n` +
      `Please create a schedule between today: ${currentDate}, and the day before the due date for each assignment, considering the user's preferred time and the due dates\n END`;
  }
  return { prompt, userAlreadyHaveWorkPlan };
}

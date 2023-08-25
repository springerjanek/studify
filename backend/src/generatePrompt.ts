import { supabase } from "./supabase.ts";

type Assignment = {
  id: number;
  name: string;
  dueDate: string;
};

export async function generatePrompt({
  assignmentName,
  dueDate,
  user_id,
}: {
  assignmentName: string;
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
  const currentMinutes = date.getMinutes()
  const currentTime = currentHour.toString() + ":" + currentMinutes.toString()

  const prefferedTime = "3-4";
  let prompt = "";

  prompt += `Assignments:\n- [${assignmentName}]: Due on [${dueDate}]\n`;

  const { data: goingAssignments, error } = await supabase
    .from("assignments")
    .select("*")
    .eq("user_id", user_id)
    .neq("name", assignmentName);

  if (error) {
    throw error;
  }

  if (goingAssignments.length > 0) {

    const filteredAssignments = goingAssignments.filter((goingAssignment: Assignment) => {
      const splittedDate = goingAssignment.dueDate.split(".")
      const [day, month, year] = splittedDate;
      const formattedDate = `${month}/${day}/${year}`;

       const dueDate = new Date(formattedDate);
      const timeDiff = date.getTime() - dueDate.getTime()

      return timeDiff <= 0
    })

    prompt += "Going on assignments:\n";
   filteredAssignments.map((assignment) => {
      prompt += `- [${assignment.name}]: Due on [${assignment.dueDate}]\n`;
    });
    prompt +=
      `Current Time: ${currentTime}\n` +
      `Preffered Time: ${prefferedTime}\n` +
      `Please create a schedule between today: ${currentDate}, and the day before the due date for each assignment, considering the user's preferred time and the due dates\n END`;
  }

  if (goingAssignments.length === 0) {
    prompt +=
      `Current Time: ${currentTime}\n` +
      `Preffered Time: ${prefferedTime}\n` +
      `Please create a schedule between today: ${currentDate}, and the day before the due date for each assignment, considering the user's preferred time and the due dates\n END`;
  }
  return { prompt };
}

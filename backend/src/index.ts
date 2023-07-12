import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { supabase } from "./supabase.ts";

dotenv.config();

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/assign-work", async (req, res) => {
  try {
    const { user_id, assignments, dueDates } = req.body;

    const prompt = generatePrompt(assignments, dueDates);

    const workPlan = await generateWorkPlan(prompt);

    if (workPlan) {
      const { data, error: insertError } = await supabase
        .from("schedules")
        .insert({
          user_id: user_id,
          data: JSON.parse(workPlan),
        });
      if (insertError) {
        throw insertError;
      }
    }

    res.send("Successfully assigned work plan");
  } catch (error) {
    console.error("Error assigning work:", error);
    res.status(500).json({ error: "Failed to assign work" });
  }
});

function generatePrompt(assignments: string[], dueDates: string[]) {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const currentDate = [day, month, year].join(".");
  const currentHour = date.getHours() % 12 || 12;

  const prefferedTime = "3-4";

  // adjust prompt if theres already going on assignment/s

  const prompt =
    "As an AI homework scheduler, I need to create a short schedule for assignments based on the user's preferred time and the due dates. Given the following information:\n" +
    `Assignments:\n- [${assignments[0]}]: Due on [${dueDates[0]}]\n` +
    `Current Time: ${currentHour}\n` +
    `Preffered Time: ${prefferedTime}\n` +
    `Desired Format: {
  "assignments": [
    {
      "name": Assignment 1,
      "dates": [
        "06.07.2023: 3PM-5PM",
        "07.07.2023: 3PM-5PM",
       ...
      ]
    } ]}\n` +
    `Please create a schedule between today: ${currentDate}, and the day before the due date for each assignment in desired format for the assignments considering the user's preferred time and the due dates. If the current time is later than the provided preferred time, adjust the time frame in the schedule to start after the current time.`;
  return prompt;
}

async function generateWorkPlan(prompt: any) {
  const parameters = {
    model: "text-davinci-003",
    prompt,
    max_tokens: 100,
    temperature: 0.2,
    n: 1,
  };

  const response = await openai.createCompletion(parameters);

  return response.data.choices[0].text;
}

app.listen(3001, () => {
  console.log(`App running on port 3001.`);
});

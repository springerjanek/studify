import express from "express";
import * as dotenv from "dotenv";
import { supabase } from "./supabase.ts";
import { generatePrompt } from "./generatePrompt.ts";
import { generateWorkPlan } from "./generateWorkPlan.ts";

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

app.post("/assign-work", async (req, res) => {
  try {
    const { user_id, assignment, dueDate } = req.body;

    const { prompt, userAlreadyHaveWorkPlan } = await generatePrompt({
      assignment,
      dueDate,
      user_id,
    });

    const workPlan = await generateWorkPlan(prompt);

    if (!userAlreadyHaveWorkPlan && workPlan) {
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

    if (userAlreadyHaveWorkPlan && workPlan) {
      const { data, error: updateError } = await supabase
        .from("schedules")
        .update({
          data: JSON.parse(workPlan),
        })
        .eq("user_id", user_id);
      if (updateError) {
        throw updateError;
      }
    }

    res.send("Successfully assigned work plan");
  } catch (error) {
    console.error("Error assigning work:", error);
    res.status(500).json({ error: "Failed to assign work" });
  }
});

app.listen(3001, () => {
  console.log(`App running on port 3001.`);
});

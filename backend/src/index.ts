import express from "express";
import * as dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { supabase } from "./supabase.ts";
import { generatePrompt } from "./generatePrompt.ts";
import { generateWorkPlan } from "./generateWorkPlan.ts";
import { AssignmentExistsError, UserSchedule } from "./utilts.ts";

dotenv.config();

const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 1,
  skip: (req) => req.method === "OPTIONS",
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(express.json());
app.use(limiter);
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
    const {
      user_id,
      assignmentName,
      dueDate,
      userSchedule,
    }: {
      user_id: string;
      assignmentName: string;
      dueDate: string;
      userSchedule: UserSchedule;
    } = req.body;

    const { data: selectAssignment } = await supabase
      .from("assignments")
      .select("*")
      .eq("name", assignmentName);

    if (selectAssignment?.length === 0) {
      const { error: insertError } = await supabase.from("assignments").insert({
        user_id: user_id,
        name: assignmentName,
        dueDate: dueDate,
      });

      if (insertError) {
        throw new Error("Error during inserting into DB");
      }

      const { prompt } = await generatePrompt({
        assignmentName,
        dueDate,
        user_id,
      });

      const workPlan = await generateWorkPlan(prompt);

      if (workPlan) {
        if (
          userSchedule.length > 0 &&
          userSchedule[0].data.assignments.length >= 0
        ) {
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

        if (userSchedule.length === 0) {
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
      }
    } else {
      throw new AssignmentExistsError();
    }

    res.send("Successfully assigned work plan");
  } catch (error) {
    if (error instanceof AssignmentExistsError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to assign work" });
    }
  }
});

app.listen(3001, () => {
  console.log(`App running on port 3001.`);
});

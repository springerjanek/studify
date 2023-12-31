import { User } from "@supabase/supabase-js";
import { Assignments } from "../features/Dashboard/components/Dashboard";
import { UserSchedule, UserScheduleResponse } from "../features/Dashboard/data-access/getUserSchedule.query";

export const mockCurrentUser: User | null = {
  id: "1",
  app_metadata: {},
  aud: "",
  created_at: "1",
  user_metadata: {},
};

export const mockValidUserAssignments: Assignments | undefined = [
  {
    id: 1,
    name: "rfdfdfd",
    dueDate: "10.09.2023",
  },
  {
    id: 2,
    name: "rfdfdfd",
    dueDate: "10.09.2023",
  },
];

export const mockExcessiveUserAssignments = [
  {
    id: 1,
    name: "rfdfdfd",
    dueDate: "10.09.2023",
  },
  {
    id: 2,
    name: "rfdfdfd",
    dueDate: "10.09.2023",
  },
  {
    id: 1,
    name: "rfdfdfd",
    dueDate: "10.09.2023",
  },
  {
    id: 2,
    name: "rfdfdfd",
    dueDate: "10.09.2023",
  },
  {
    id: 3,
    name: "rfdfdfd",
    dueDate: "10.09.2023",
  },
  {
    id: 4,
    name: "rfdfdfd",
    dueDate: "10.09.2023",
  },
  {
    id: 5,
    name: "rfdfdfd",
    dueDate: "10.09.2023",
  },
  {
    id: 6,
    name: "rfdfdfd",
    dueDate: "10.09.2023",
  },
];

export const mockUserSchedule: UserScheduleResponse | undefined = {user_schedule:[
  {
      data: {
      assignments: [
        {
          name: "rfdfdfd",
          dates: [
            "10.09.2023: 3PM-3:30PM",
            "11.09.2023: 11AM-12AM",
            "12.09.2023: 2:22PM-6:00PM",
          ],
        },
      ],
    },
  },
], workingDates: [""]};
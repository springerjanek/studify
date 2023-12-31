import axios from "axios";
import { User } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { AssignmentFormValues } from "./AddAssignmentForm";
import { UserScheduleResponse } from "@/app/features/Dashboard/data-access/getUserSchedule.query";
import { Assignments } from "../../Dashboard";

export const handleFormSubmit = async ({
  data,
  queryClient,
  user_assignments,
  user_schedule,
  toast,
  currentUser,
  setLoading,
  showModal,
}: {
  data: AssignmentFormValues;
  queryClient: QueryClient,
  user_assignments: Assignments | undefined;
  user_schedule: UserScheduleResponse | undefined;
  toast: any;
  currentUser: User | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const year = data.dueDate.getFullYear();
  const month = data.dueDate.getMonth() + 1;
  const day = data.dueDate.getDate();

  const formattedDate = [
    ("0" + day).slice(-2),
    ("0" + month).slice(-2),
    year,
  ].join(".");

  const formData = new FormData();
  formData.append("user_id", currentUser!.id);
  formData.append("assignmentName", data.assignmentName);
  formData.append("dueDate", formattedDate);
  formData.append("userSchedule", JSON.stringify(user_schedule?.user_schedule));

  setLoading(true);

  if (user_assignments && user_assignments.length > 4) {
    setLoading(false);
    return toast({
      title: "You can only have 5 assignments at a time on a free version",
      className: "text-red-500",
    });
  }

  try {
    await axios.post("http://localhost:3001/assign-work", formData);

    queryClient.invalidateQueries({ queryKey: ["user_assignments"] });
    queryClient.invalidateQueries({ queryKey: ["user_schedule"] });

    setLoading(false);
    showModal(false);

    toast({
      title: "Successfully assigned work plan",
      description: "Check your calendar for more info",
      className: "text-black",
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast({
          title: error.response.data.error,
          className: "text-red-500",
        });
      } else {
        toast({
          title: "Network error occurred. Backend may be down.",
          className: "text-red-500",
        });
      }
    } else {
      toast({
        title:
          "You can only add assignment and generate a work plan per 10 seconds.",
        className: "text-red-500",
      });
    }
    setLoading(false);
  }
};

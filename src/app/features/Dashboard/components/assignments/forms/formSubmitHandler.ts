import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { AssignmentFormValues } from "./AddAssignmentForm";
import { UserScheduleResponse } from "@/app/features/Dashboard/data-access/getUserSchedule.query";
import { Assignments } from "../../Dashboard";

export const handleFormSubmit = async ({
  data,
  queryClient,
  toast,
  currentUser,
  setLoading,
  showModal,
}: {
  data: AssignmentFormValues;
  queryClient: QueryClient;
  toast: any;
  currentUser: User | undefined;
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

  const userScheduleData: UserScheduleResponse | undefined =
    queryClient.getQueryData(["user_schedule"]);
  const userSchedule = userScheduleData && userScheduleData.user_schedule;

  const userAssignments: Assignments | undefined = queryClient.getQueryData(["user_assignments"])

  setLoading(true);

  if (userAssignments && userAssignments.length > 4) {
    setLoading(false)
    return toast({
      title:
        "You can only have 5 assignments at a time on a free version",
      className: "text-red-500",
    });
  }

    try {
      await axios.post("http://localhost:3001/assign-work", {
        user_id: currentUser!.id,
        assignmentName: data.assignmentName,
        dueDate: formattedDate,
        userSchedule: userSchedule,
      });
      
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

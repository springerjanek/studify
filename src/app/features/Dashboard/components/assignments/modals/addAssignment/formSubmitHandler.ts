import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { AssignmentFormValues } from "../../../forms/AddAssignmentForm";
import { UserScheduleResponse } from "@/app/features/Dashboard/data-access/getUserSchedule.query";

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

  setLoading(true);

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
        toast({
          title: error.response ? error.response.data.error : "You can only add assignment and generate work plan per 10 seconds.",
          className: "text-red-500",
        });
      } else {
        console.error(error);
        toast({
          title: "Uknown Error",
          className: "text-red-500",
        });
      }
        setLoading(false);
    }
};

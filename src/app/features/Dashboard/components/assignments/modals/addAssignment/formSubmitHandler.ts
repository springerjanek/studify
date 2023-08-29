import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../../../../../supabase";
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

  const { data: selectAssignment } = await supabase
    .from("assignments")
    .select("*")
    .eq("name", data.assignmentName);

  if (selectAssignment?.length === 0) {
    try {
      const { error: insertError } = await supabase.from("assignments").insert({
        user_id: currentUser!.id,
        name: data.assignmentName,
        dueDate: formattedDate,
      });

      if (insertError) {
        throw new Error("Error during inserting into DB");
      }

      queryClient.invalidateQueries({ queryKey: ["user_assignments"] });

      await axios.post("http://localhost:3001/assign-work", {
        user_id: currentUser!.id,
        assignmentName: data.assignmentName,
        dueDate: formattedDate,
        userSchedule: userSchedule,
      });

      queryClient.invalidateQueries({ queryKey: ["user_schedule"] });

      setLoading(false);
      showModal(false);

      toast({
        title: "Successfully assigned work plan",
        description: "Check your calendar for more info",
        className: "text-black",
      });
    } catch (error: unknown) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        toast({
          title: "Error during generating work plan",
          className: "text-red-500",
        });
      } else {
        console.error(error);
        toast({
          title: "Uknown Error",
          className: "text-red-500",
        });
      }
    }
  } else {
    setLoading(false)
    toast({
      title: "This assignment already exists",
      className: "text-red-500",
    });
  }
};

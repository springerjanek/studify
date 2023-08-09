import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../../../../../supabase";
import { AssignmentFormValues } from "../../../forms/AddAssignmentForm";

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

  setLoading(true);

  try {
    await supabase.from("assignments").insert({
      user_id: currentUser!.id,
      name: data.assignmentName,
      dueDate: formattedDate,
    });

    queryClient.invalidateQueries({ queryKey: ["user_assignments"] });

    await axios.post("http://localhost:3001/assign-work", {
      user_id: currentUser!.id,
      assignment: data.assignmentName,
      dueDate: formattedDate,
    });

    queryClient.invalidateQueries({ queryKey: ["user_schedule"] });

    setLoading(false);
    showModal(false);

    toast({
      title: "Successfully assigned work plan",
      description: "Check your calendar for more info",
      className: "text-black",
    });
  } catch (error) {
    setLoading(false);
    toast({
      title: "Error during processing work plan",
      className: "text-red",
    });
  }
};
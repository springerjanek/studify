import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/app/shared/utils/auth";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../../../../../supabase";
import { AssignmentFormValues } from "../../forms/AddAssignmentForm";

export const handleFormSubmit = async ({
  data,
  setLoading,
  showModal
}: {
  data: AssignmentFormValues;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { currentUser } = useAuth();

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
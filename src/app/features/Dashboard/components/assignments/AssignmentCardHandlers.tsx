import { useAuth } from "@/app/shared/utils/auth";
import { useDeleteUserAssignment } from "../../data-access/mutations/deleteAssignment.mutation";
import { useCompleteAssignment } from "../../data-access/mutations/completeAssignment.mutation";
import { useToast } from "@/components/ui/use-toast";


export const AssignmentCardHandlers = ({ name }: { name: string }) => {

  const { currentUser } = useAuth();

  const deleteAssignment = useDeleteUserAssignment();
  const completeAssignment = useCompleteAssignment();

  const { toast } = useToast();

  const handleCompletedAssignment = () => {
    completeAssignment.mutate({
      userId: currentUser!.id,
      assignmentName: name,
    });

    toast({
      title: "Successfully Completed Your Assignment",
      description: "Delete it later on ;)",
      className: "text-black",
    });
  };

  const handleDeleteAssignment = () => {
    deleteAssignment.mutate({
      userId: currentUser!.id,
      assignmentName: name,
    });

    toast({
      title: "Successfully Deleted Your Assignment",
      description: "Time for more :)",
      className: "text-black",
    });
  };

  return { handleCompletedAssignment, handleDeleteAssignment };
};

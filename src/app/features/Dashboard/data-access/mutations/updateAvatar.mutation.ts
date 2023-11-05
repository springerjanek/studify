import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../../supabase";
import { useToast } from "@/components/ui/use-toast";

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      userId,
      avatar,
      avatar_url,
    }: {
      userId: string;
      avatar: File;
      avatar_url: string;
    }) => {
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(avatar_url, avatar);

      if (uploadError) {
        toast({
          title: "Error during uploading avatar",
          description: uploadError.message,
          className: "text-red-400",
        });
      }

      const { error: saveError } = await supabase
        .from("users")
        .update({ avatar_url: avatar_url })
        .eq("user_id", userId);

      if (saveError) {
        toast({
          title: "Error during saving avatar",
          description: saveError.message,
          className: "text-red-400",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Successfully uploaded avatar!",
        className: "text-black",
      });
      queryClient.invalidateQueries({ queryKey: ["user_avatar"] });
    },
  });
};

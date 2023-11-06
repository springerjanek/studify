import { useEffect } from "react";
import { useUpdateAvatar } from "@/app/features/Dashboard/data-access/mutations/updateAvatar.mutation";
import { User } from "@supabase/supabase-js";

export const updateAvatarLogic = ({
  selectedImage,
  saveAvatar,
  currentUser,
}: {
  selectedImage: null | File;
  saveAvatar: boolean,
  currentUser: User
}) => {
  const updateAvatar = useUpdateAvatar();

  useEffect(() => {
    if (selectedImage && saveAvatar) {
      const file = selectedImage;
      const fileExt = file.name.split(".").pop();
      const filePath = `${currentUser.email}.${fileExt}`;

      updateAvatar.mutate({
        userId: currentUser.id,
        avatar: file,
        avatar_url: filePath,
      });
    }
  }, [selectedImage, saveAvatar]);
};
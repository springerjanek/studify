import { useRef, useState } from "react";
import { useGetUserAvatar } from "../../../data-access/getUserAvatar.query";
import { updateAvatarLogic } from "./utils/updateAvatar";
import { User } from "@supabase/supabase-js";
import { AvatarContainer, DragAndDropContainer } from "./Profile.styled";
import { Button } from "@/app/shared/ui/Button";
import CloseIcon from "@mui/icons-material/Close";

export const DragAndDrop = ({ currentUser }: { currentUser: User }) => {
  const [saveAvatar, setSaveAvatar] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | File>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const { data: userAvatar } = useGetUserAvatar(currentUser.id);
  const userAvatarUrl = userAvatar
    ? `https://rwwldaqpuxdnztewxate.supabase.co/storage/v1/object/public/avatars/${userAvatar[0].avatar_url}`
    : "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png";

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  updateAvatarLogic({ selectedImage, saveAvatar, currentUser });

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    setSelectedImage(file);
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedImage(files[0]);
    }
  };

  const handleCloseIcon = () => {
    setSelectedImage(null);
    setSaveAvatar(false);
  };

  return (
    <>
      <DragAndDropContainer
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <CloseIcon onClick={handleCloseIcon} className="w-4 h-4" />

        <AvatarContainer>
          <img
            className="rounded-full cursor-pointer"
            onClick={openFileInput}
            src={
              selectedImage ? URL.createObjectURL(selectedImage) : userAvatarUrl
            }
          ></img>
        </AvatarContainer>

        {isDragActive && <p>Drag and drop!</p>}
      </DragAndDropContainer>
      {selectedImage && (
        <Button className="mt-4" $primary onClick={() => setSaveAvatar(true)}>
          Save Avatar
        </Button>
      )}
    </>
  );
};

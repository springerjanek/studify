import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AvatarContainer, DragAndDropContainer } from "./Profile.styled";

export const DragAndDrop = () => {
  const [selectedImage, setSelectedImage] = useState<null | File>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDragActive, setIsDragActive] = useState<boolean>(false);

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
    setSelectedImage(files[0]);
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

  return (
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
      <CloseIcon onClick={() => setSelectedImage(null)} className="w-4 h-4" />

      <AvatarContainer>
        <img
          className="rounded-full cursor-pointer"
          onClick={openFileInput}
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
          }
        ></img>
      </AvatarContainer>

      {isDragActive && <p>Drag and drop!</p>}
    </DragAndDropContainer>
  );
};

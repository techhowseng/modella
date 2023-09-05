import React, { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiImageEditFill } from "react-icons/ri";
import { uploadImageService } from "./service";

interface MediaUploadProp {
  type: "profile" | "gallery";
  setPreview?: any;
  payloadKey: string;
  handleUpload?: (image: FormData) => void;
}

const MediaUpload = ({
  type,
  setPreview,
  handleUpload,
  payloadKey = "content",
}: MediaUploadProp) => {
  const hiddenFileInput = useRef(null);
  // const [image, setImage] = useState<FormData>();
  // const contentType = type === "gallery" ? "Gallery" : "Thumbnail";

  const handleChange = async (e: any) => {
    const files = e.target.files;
    const formData = new FormData();
    const reader = new FileReader();

    formData.append(payloadKey, files[0]);

    if (files.length) {
      reader.readAsDataURL(files[0]);
      reader.onload = (readerEvent) => {
        setPreview(readerEvent.target.result as string);
      };
    }

    !!handleUpload && handleUpload(formData);
  };

  if (type === "gallery") {
    return (
      <>
        <button
          onClick={() => hiddenFileInput?.current?.click()}
          className="p-4 absolute top-0 right-0 group hover:bg-[rgba(0,0,0,0.5)] hover:scale-75 transition-all duration-200 ease-in-out rounded"
        >
          <AiOutlineDelete className="h-5 w-5 text-white" />
        </button>
        <input
          ref={hiddenFileInput}
          type="file"
          name="gallery"
          onChange={handleChange}
          accept="image/png, image/gif, image/jpeg, image/webp"
          className="hidden"
        />
      </>
    );
  } else if (type === "profile") {
    return (
      <>
        <button
          onClick={() => hiddenFileInput?.current?.click()}
          className="p-4 absolute top-0 right-0 group bg-[rgba(0,0,0,0.5)] hover:scale-75 transition-all duration-200 ease-in-out rounded"
        >
          <RiImageEditFill className="h-5 w-5 text-white" />
        </button>
        <input
          ref={hiddenFileInput}
          type="file"
          onChange={handleChange}
          name="gallery"
          accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
          className="hidden"
        />
      </>
    );
  }
  return null;
};

export default MediaUpload;

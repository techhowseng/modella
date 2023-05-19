import React, { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiImageEditFill } from "react-icons/ri";
import { uploadImageService } from "./service";

interface MediaUploadProp {
  type: "profile" | "gallery";
  setPreview?: any;
}

const MediaUpload = ({ type, setPreview }: MediaUploadProp) => {
  const hiddenFileInput = useRef(null);
  const contentType = type === "gallery" ? "Gallery" : "Thumbnail";

  const handleChange = async (e: any) => {
    const files = e.target.files;
    const formData = new FormData();
    const reader = new FileReader();

    formData.append("content", files[0]);
    formData.append("contentType", contentType);

    if (files.length) {
      reader.readAsDataURL(files[0]);
      reader.onload = (readerEvent) => {
        // @ts-ignore
        // console.log(
        //   "🚀 ~ file: index.tsx:50 ~ result",
        //   readerEvent.target.result
        // );
        setPreview(readerEvent.target.result as string);
      };
    }

    const res = await uploadImageService(formData);
    //     data: [{…}]
    //     message: "Successfully uploaded images."
    console.log("🚀 ~ file: index.tsx:37 ~ handleChange ~ res:", res);
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

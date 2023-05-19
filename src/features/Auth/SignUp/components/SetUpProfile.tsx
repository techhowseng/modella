import Button from "components/Button";
import Input from "components/Input";
import React, { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";

function SetUpProfile({
  handleChange,
  preview
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string;
}) {
  const hiddenFileInput = useRef(null);
  // const [preview, setPreview] = useState<string>();

  // const handleChange = async (e: any) => {
  //   const files = e.target.files;
  //   const formData = new FormData();
  //   const reader = new FileReader();

  //   formData.append("image", files[0]);

  //   if (files.length) {
  //     reader.readAsDataURL(files[0]);
  //     reader.onload = (readerEvent) => {
  //       setPreview(readerEvent.target.result as string);
  //     };
  //   }

  //   // const res = await uploadImageService(formData);
  //   //     data: [{…}]
  //   //     message: "Successfully uploaded images."
  //   // console.log("🚀 ~ file: index.tsx:37 ~ handleChange ~ res:", res);
  // };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center mb-10">
        <div
          className="relative overflow-hidden w-[108px] h-[108px] p-6 border rounded-full cursor-pointer"
          aria-label="button"
          onClick={() => hiddenFileInput?.current?.click()}
        >
          {preview ? (
            <img className="absolute top-0 left-0 rounded" src={preview} alt={"profile preview image"} />
          ) : (
            <CiImageOn size={58} className="base-grey" />
          )}
        </div>
        <p className="ml-10">Please add a photo of yourself</p>
      </div>

      <Input
        inputRef={hiddenFileInput}
        label={"Choose a Profile Image"}
        name={"file"}
        placeholder={"Input File"}
        type={"file"}
        onChange={handleChange}
      />

      {/* <p className="mt-10">
        Please do ensure you click on the verification link sent to your mail to
        activate account
      </p> */}
    </div>
  );
}

export default SetUpProfile;

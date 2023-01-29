import React from "react";

function ProfileImage({ image, name, title }) {
  return (
    <div className="flex flex-col mt-[-100px]">
      <img
        className="rounded-full w-32 h-32 border border-4 border-white"
        src={image}
        alt={name}
      />
      <div className="space-y-0.5 font-medium text-black text-left">
        <div className="text-xl">{name}</div>
        <div className="text-sm font-light text-gray-500">{title}</div>
      </div>
    </div>
  );
}

export default ProfileImage;

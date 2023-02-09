import Button from "components/Button";
import Input from "components/Input";
import React from "react";
import { CiImageOn } from "react-icons/ci";

function SetUpProfile() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center mb-10">
        <div
          className="p-6 border rounded-full cursor-pointer"
          aria-label="button"
          onClick={() => {}}
        >
          <CiImageOn size={58} className="base-grey" />
        </div>
        <p className="ml-10">Please add a photo of yourself</p>
      </div>

      <Input
        label={"Choose a username"}
        name={"username"}
        placeholder={"Input Username"}
        type={"username"}
        onChange={() => {}}
      />

      {/* <p className="mt-10">
        Please do ensure you click on the verification link sent to your mail to
        activate account
      </p> */}
    </div>
  );
}

export default SetUpProfile;

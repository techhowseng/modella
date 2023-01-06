import Button from "components/Button";
import Input from "components/Input";
import React from "react";
import { CiImageOn } from "react-icons/ci";

function SetUpProfile() {
  return (
    <div className="flex-1 py-20 md:py-30 lg:py-36 px-10 lg:px-38 md:px-20 h-full flex flex-col justify-center">
      <div className="flex flex-col">
        <h1 className="text-5xl mb-10 font-bold">
          Congratulations, welcome on board
        </h1>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row items-center">
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

        <p className="mt-10">
          Please do ensure you click on the verification link sent to your mail
          to activate account
        </p>
      </div>

      <Button className="mt-10" onClick={() => {}}>
        <p className="text-white">Register</p>
      </Button>
      {/* <!---dskdlksld---> */}
    </div>
  );
}

export default SetUpProfile;

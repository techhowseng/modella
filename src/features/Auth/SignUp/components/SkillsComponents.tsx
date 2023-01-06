import Button from "components/Button";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { HiOutlineEye } from "react-icons/hi";
import RegistrationSteps from "./RegistrationSteps";

const Skill = () => {
  return (
    <div className="flex flex-row items-center mt-10 w-full rounded-xl border p-6">
      <img
        className="w-14 h-14 rounded-full mr-6"
        src="https://res.cloudinary.com/dcbqn1c10/image/upload/v1672978625/Ellipse_21_epcyh5.png"
        alt="skill set"
      />
      <p>Modelling</p>
    </div>
  );
};

function SkillsComponents() {
  return (
    <div className="flex-1 py-20 md:py-30 lg:py-36 px-10 lg:px-38 md:px-20 h-full flex flex-col justify-center">
      <div className="flex flex-col">
        <h1 className="text-5xl mb-10 font-bold">
          Welcome, Great step to showcase your skill.
        </h1>
        <div className="flex flex-row">
          <p className="mr-1">Which Skill do you Have?</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Skill />
        <Skill />
        <Skill />
        <Skill />
      </div>

      <Button className="mt-10" onClick={() => {}}>
        <p className="text-white">Next</p>
      </Button>
      {/* <!---dskdlksld---> */}
    </div>
  );
}

export default SkillsComponents;

import Button from "components/Button";
import CheckBox from "components/CheckBox";
import Input from "components/Input";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";

const CREATOR_SIGNUP_FORM = [
  {
    label: "First Name",
    type: "text",
    name: "firstName",
    placeholder: "Please enter your First Name",
  },
  {
    label: "Last name",
    type: "text",
    name: "lastName",
    placeholder: "Please enter your Last name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Please enter your Email Address",
  },
  {
    label: "Phone Number",
    type: "phone",
    name: "phoneNumber",
    placeholder: "Please enter your Phone Number",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Please enter your Password",
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    placeholder: "Please enter your Confirm Password",
  },
];

function CreatorSignUpForm() {
  return (
    <div className="flex-1 py-10 lg:py-20 md:py-24 px-5 lg:px-38 md:px-20 h-full flex flex-col justify-center">
      <div className="flex flex-col">
        <h1 className="text-5xl mb-10 font-bold">Welcome</h1>
        <p className="mr-1 text-xl">Please fill out the form</p>
      </div>

      <div className="flex flex-col mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {CREATOR_SIGNUP_FORM.map((field) => (
            <Input
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
              onChange={() => {}}
            />
          ))}
        </div>

        <CheckBox name={"tos"} onChange={() => {}}>
          I accept the{" "}
          <span className="base-blue">
            <Link href={APP_ROUTES.tos}>Terms and conditions</Link>
          </span>{" "}
          of Modella.
        </CheckBox>
      </div>

      <Button className="mt-10" onClick={() => {}}>
        <p className="text-white">Next</p>
      </Button>
      {/* <!---dskdlksld---> */}

      <p className="mt-10">
        Already have an account?{" "}
        <span className="base-blue">
          <Link href={APP_ROUTES.login}>Login</Link>
        </span>{" "}
      </p>
    </div>
  );
}

export default CreatorSignUpForm;

import Button from "components/Button";
import CheckBox from "components/CheckBox";
import Input from "components/Input";
import { useRegistrationUserType } from "features/Auth/hooks";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useEffect } from "react";

const CLIENT_SIGNUP_FORM = [
  {
    label: "Full Name",
    type: "text",
    name: "fullname",
    // placeholder: "Enter your Full Name",
  },
  {
    label: "Company name",
    type: "text",
    name: "companyName",
    // placeholder: "Company's name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    // placeholder: "Enter your Email Address",
  },
  {
    label: "Country",
    type: "select",
    name: "country",
    // placeholder: "Select your Country",
    options: [],
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    // placeholder: "Enter your Password",
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    // placeholder: "Confirm Password",
  },
];

function ClientSignupForm() {
  return (
    <div className="flex-1 w-full py-10 lg:py-20 md:py-24 px-0 lg:px-38 md:px-20 h-full flex flex-col justify-center">
      <div className="flex flex-col">
        {/* <h1 className="text-5xl mb-10 font-bold">Congratulations</h1> */}
        <p className="mr-1 text-2xl">
          Welcome, you are a step ahead to great services
        </p>
      </div>

      <div className="flex flex-col mt-10">
        {/* <div className="flex flex-row items-center">
          <p className="ml-10">Please add a photo of yourself</p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {CLIENT_SIGNUP_FORM.map((field) => (
            <Input
              label={field.label}
              name={field.name}
              // placeholder={field.placeholder}
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
        <p className="text-white">Register</p>
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

export default ClientSignupForm;

import SideDisplay from "components/Auth/SideDisplay";
import Button from "components/Button";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { HiOutlineEye } from "react-icons/hi";

function SignUp() {
  return (
    <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row sm:h-fit lg:h-screen">
      <SideDisplay />

      <div className="flex-1 py-20 md:py-30 lg:py-36 px-10 lg:px-48 md:px-20 h-full flex flex-col justify-start">
        <div className="flex flex-col">
          <h1 className="text-5xl mb-10 font-bold">Create an Account</h1>
          <div className="flex flex-row">
            <p className="mr-1">Already have an account?</p>
            <Link href={APP_ROUTES.login} className="base-blue">
              Login Now
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col mt-10">
            <label className="mb-2">Email Address</label>
            <input
              type="email"
              placeholder="abc@mail.com"
              className="base-input w-full p-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            />
          </div>

          <div className="flex flex-col mt-10">
            <label className="mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Input your Password"
                className="base-input w-full p-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              />
              <HiOutlineEye className="absolute top-4 right-4" size={24} />
            </div>
          </div>

          <div className="flex flex-col md:flex-col lg:flex-row mt-10 justify-between items-center">
            <p className="base-grey mb-10">Forget Password?</p>
            <Button onClick={() => {}}>
              <p className="text-white">Sign Up</p>
            </Button>
          </div>

          <div className="w-full flex items-center justify-between mt-10">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 base-color focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                By clicking Sign Up, I agree that I have read and accepted the{" "}
                <span className="base-blue">
                  <Link href={APP_ROUTES.tos}>Terms of Use</Link>
                </span>{" "}
                and{" "}
                <span className="base-blue">
                  <Link href={APP_ROUTES.privacy}>Privacy Policy</Link>
                </span>
                .
              </label>
            </div>
          </div>
        </div>

        {/* <!---dskdlksld---> */}
      </div>

      {/* <!---dskdlksld---> */}
    </div>
  );
}

export default SignUp;

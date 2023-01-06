import SideDisplay from "components/Auth/SideDisplay";
import Button from "components/Button";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { HiOutlineEye } from "react-icons/hi";

function Login() {
  return (
    <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row sm:h-fit lg:h-screen">
      <SideDisplay />

      <div className="flex-1 py-20 md:py-30 lg:py-36 px-10 lg:px-48 md:px-20 h-full flex flex-col justify-start">
        <div className="flex flex-col">
          <h1 className="text-5xl mb-10 font-bold">Sign In</h1>
          <div className="flex flex-row">
            <p className="mr-1">New User?</p>
            <Link href={APP_ROUTES.signup} className="base-blue">
              Create Account
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
              <p className="text-white">Sign In</p>
            </Button>
          </div>
        </div>

        {/* <!---dskdlksld---> */}
      </div>

      {/* <!---dskdlksld---> */}
    </div>
  );
}

export default Login;

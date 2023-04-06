import { Model } from "@prisma/client";
import Button from "components/Button";
import LinkButton from "components/LinkButton";
import Rating from "components/Rating";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiLinkedin, FiTwitter } from "react-icons/fi";

const SOCIAL_ICONS = {
  facebook: <FiFacebook className="text-[#3b5998]" />,
  twitter: <FiTwitter className="text-[#1da1f2]" />,
  linkedIn: <FiLinkedin className="text-[#4285F4]" />,
  instagram: <FaInstagram className="text-red-700" />,
};

function ModelProfileAside({
  user,
  isLoggedInUser,
}: {
  isLoggedInUser: boolean;
  user: Model;
}) {
  return (
    <div>
      <div className="image w-full h-40 bg-gray-300">
        <img
          className="w-full h-40 object-cover"
          srcSet="https://randomuser.me/api/portraits/women/12.jpg"
          src="https://randomuser.me/api/portraits/women/12.jpg"
          alt={"Profile banner Image"}
          onLoad={() => console.log("loaded")}
          onError={() => console.log("error")}
        />
      </div>
      <div className="p-6">
        <h1 className="text-2xl w-full font-bold mx-auto antialiased capitalize flex">
          {user.firstname} {user.lastname}{" "}
          {user.isAvailable ? (
            <span
              className="flex w-3 h-3 bg-green-500 rounded-full items-center"
              title="Available"
            />
          ) : (
            <span
              className="flex w-3 h-3 bg-red-500 rounded-full items-center"
              title="Not Available"
            />
          )}
        </h1>
        <h5 className="text-md text-inherit w-full mx-auto antialiased mt-2">
          Professional Model
        </h5>
        <div className="flex flex-row my-2">
          <Rating rating={3} />
        </div>
        <div className="flex flex-row justify-between	mt-3">
          {/* @ts-ignore */}
          {isLoggedInUser && user?.type === "Model" ? (
            <>
              <LinkButton href={APP_ROUTES.bioData}>Edit Profile</LinkButton>
            </>
          ) : (
            <>
              <Button onClick={undefined}>Message</Button>
              <div className="w-3" />
              <Button
                className="!bg-transparent !base-color base-border-color border-2 hover:!text-white"
                onClick={() => {}}
              >
                Send Contract
              </Button>
            </>
          )}
        </div>
        <div className="flex flex-col justify-start">
          <div className="mt-10">
            <h1 className="text-md font-bold text-gray-500">Bio</h1>
            <p className="text-md text-inherit">{user.bio}</p>
          </div>
          <div className="mt-10">
            <h1 className="text-md font-bold text-gray-500">Location</h1>
            <p className="text-md text-inherit">{user.address}</p>
          </div>
          <div className="mt-10">
            <h1 className="text-md font-bold text-gray-500">Socials</h1>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              {user.social &&
                Object.keys(user.social).map((social) => {
                  if (user.social[social]) {
                    return (
                      <li className="flex items-center" key={social}>
                        {SOCIAL_ICONS[social]}
                        <p className="text-md mr-2"></p>
                        <Link
                          href={user.social[social]}
                          target={"_blank"}
                          className="text-md text-inherit hover:underline"
                        >
                          {user.social[social]}
                        </Link>
                      </li>
                    );
                  } else {
                    return null;
                  }
                })}
            </ul>
          </div>
          <div className="mt-10">
            <h1 className="text-md font-bold text-gray-500">Body Type</h1>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              <li className="flex items-center">
                <p className="mr-2">Complexion: {user?.complexion}</p>
                {user && user?.complexion?.includes("Light") ? (
                  <span className="flex w-3 h-3 bg-amber-400 rounded-full items-center" />
                ) : (
                  <span className="flex w-3 h-3 bg-amber-900 rounded-full items-center" />
                )}
              </li>
              <li className="flex items-center">Height: {user.height}</li>
              <li className="flex items-center">
                Weight: {user.weight as unknown as number}
              </li>
              <li className="flex items-center">Burst: {user.bust}</li>
              <li className="flex items-center">Hips: {user.hip}</li>
              <li className="flex items-center">Waist: {user.waist}</li>
              <li className="flex items-center">Shoe Size: {user.shoeSize}</li>
            </ul>
          </div>
          {/* <div className="mt-10">
            <h1 className="text-md font-bold text-gray-500">Activity</h1>
            <p className="text-md text-inherit">Proffesional model</p>
          </div> */}
          {/* <p className="text-md text-inherit">
              Run-way shoots, coverpage shoots, potrati face modelling
            </p> */}
        </div>
      </div>
    </div>
  );
}

export default ModelProfileAside;

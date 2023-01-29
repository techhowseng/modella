import Link from "next/link";
import React from "react";
import { Button } from "..";

function JobCard() {
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg border">
      <div className="flex space-x-3 items-center">
        <img
          className="rounded-full w-10 h-10"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
          alt="profile picture"
        />
        <div className="space-y-0.5 font-medium text-black text-left">
          <div>Bonnie Green</div>
          <div className="text-sm font-light text-gray-500">
            Developer at Open AI
          </div>
        </div>
      </div>
      <blockquote className="max-w-2xl my-4 text-gray-500">
        <h3 className="text-lg font-semibold text-black">
          Very easy this was to integrate
        </h3>
        <p className="my-4 font-light">
          If you care for your time, I hands down would go with this."
        </p>
      </blockquote>
      <div className="flex -space-x-4">
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-white"
          src="https://randomuser.me/api/portraits/women/13.jpg"
          alt=""
        />
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-white"
          src="https://randomuser.me/api/portraits/women/14.jpg"
          alt=""
        />
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-white"
          src="https://randomuser.me/api/portraits/women/15.jpg"
          alt=""
        />
        <Link
          className="flex items-center justify-center px-2 text-xs font-medium text-white bg-gray-400 border-2 border-white rounded-full hover:bg-white-600 dark:border-white-800"
          href="#"
        >
          +99 people applied
        </Link>
      </div>
      <div className="mt-5">
        <Button type="button" className="!base-bg-color !w-full" onClick={() => {}}>Apply</Button>
      </div>
    </div>
  );
}

export default JobCard;

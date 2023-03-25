import Button from "components/Button";
import { User } from "features/Auth/types";
import { Job } from "features/ClientAccount/types";
import { isApplied } from "features/functions";
import { APP_ROUTES, resolveRoute } from "lib/routes";
import Link from "next/link";
import Router from "next/router";
import React from "react";

function JobCard({
  user,
  job,
  isClient,
}: {
  user: User;
  isClient: boolean;
  job: Job;
}) {
  const isAppliedToJob = isApplied(user, job?.applicants);

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg border">
      {!isClient && (
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
      )}
      <blockquote className="max-w-2xl mt-2 text-gray-500">
        <h3 className="text-lg font-semibold text-black">{job.jobRole}</h3>
        <p className="my-2 font-light">{job.jobDescription}</p>
      </blockquote>
      <div className="text-gray-500 flex justify-between mb-2">
        <p className="text-sm">Type: {job.jobType}</p>
        <p className="text-sm ml-4">{job.salary}</p>
      </div>
      <div className="flex -space-x-4">
        <img
          className="w-8 h-8 border-2 border-white rounded-full dark:border-white"
          src="https://randomuser.me/api/portraits/women/13.jpg"
          alt=""
        />
        <img
          className="w-8 h-8 border-2 border-white rounded-full dark:border-white"
          src="https://randomuser.me/api/portraits/women/14.jpg"
          alt=""
        />
        <img
          className="w-8 h-8 border-2 border-white rounded-full dark:border-white"
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
        {!isClient && (
          <Button
            type="button"
            className="!base-bg-color !w-full"
            data-drawer-target="drawer-right-example"
            data-drawer-show="drawer-right-example"
            data-drawer-placement="right"
            aria-controls="drawer-right-example"
            onClick={() => {
              Router.push(resolveRoute(APP_ROUTES.job, job.id));
            }}
            disabled={isAppliedToJob}
          >
            {isAppliedToJob ? "Applied" : "Apply"}
          </Button>
        )}
        {isClient && (
          <Button
            type="button"
            className="!base-bg-color !w-full"
            onClick={() => {}}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}

export default JobCard;

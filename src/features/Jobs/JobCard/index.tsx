import { User } from "@prisma/client";
import Button from "components/Button";
import { Job } from "features/ClientAccount/types";
import { isApplied } from "features/functions";
import { formatCurrencyInteger } from "lib/formatCurrency";
import { APP_ROUTES, resolveRoute } from "lib/routes";
import Link from "next/link";
import Router from "next/router";
import React from "react";

function JobCard({
  user,
  job,
  isClient,
  onEdit,
}: {
  user: User;
  isClient: boolean;
  job: Job;
  onEdit?: (job: Job) => void;
}) {
  const route = location.pathname;
  const isAppliedToJob = isApplied(user, job?.applicants);
  const isOwner = String(job.clientId) === String(user.id);

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg border justify-between">
      {!isClient && (
        <div className="flex space-x-3 items-center">
          <img
            className="rounded-full w-10 h-10"
            src={
              job?.client?.user?.Media[0] ||
              "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
            }
            alt={job?.client?.companyName}
          />
          <div className="space-y-0.5 font-medium text-black text-left">
            <div>{job?.client?.companyName}</div>
            <div className="text-sm font-light text-gray-500">
              {job?.client?.companyName}
            </div>
          </div>
        </div>
      )}
      <blockquote className="max-w-2xl mt-2 text-gray-500">
        <h3 className="text-lg font-semibold text-black">{job.jobRole}</h3>
        <p className="my-2 font-light">{job.jobDescription}</p>
      </blockquote>
      <div className="flex flex-col">
        <div className="text-gray-500 flex justify-between mb-2">
          <p className="text-sm">Type: {job.jobType}</p>
          <p className="text-sm ml-4 base-color font-bold">
            {formatCurrencyInteger(Number(job.fee), "NGN")}
          </p>
        </div>
        {job?.applicants?.length > 0 && (
          <div className="flex -space-x-4 transition-all duration-200 ease-in-out">
            <img
              className="w-8 h-8 border-2 border-white rounded-full dark:border-white hover:z-10 hover:cursor-pointer transition-all duration-200 ease-in-out"
              src="https://randomuser.me/api/portraits/women/13.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 border-2 border-white rounded-full dark:border-white hover:z-10 hover:cursor-pointer transition-all duration-200 ease-in-out"
              src="https://randomuser.me/api/portraits/women/14.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 border-2 border-white rounded-full dark:border-white hover:z-10 hover:cursor-pointer transition-all duration-200 ease-in-out"
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
        )}

        {user?.id ? (
          <>
            {!isClient && (
              <Button
                type="button"
                className="!base-bg-color !w-full mt-5"
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
            {isOwner && isClient && (
              <Button
                type="button"
                className="!base-bg-color !w-full mt-5"
                onClick={
                  route === "/jobs"
                    ? () => Router.push(resolveRoute(APP_ROUTES.job, job.id))
                    : () => {
                        onEdit && onEdit(job);
                        Router.push(
                          `${APP_ROUTES.clientProfile}/jobs/${job.id}`
                        );
                      }
                }
              >
                Edit
              </Button>
            )}
          </>
        ) : (
          <Button
            type="button"
            className="!base-bg-color !w-full mt-5"
            onClick={() => {
              Router.push(resolveRoute(APP_ROUTES.job, job.id));
            }}
            disabled={isAppliedToJob}
          >
            Apply
          </Button>
        )}
      </div>
    </div>
  );
}

export default JobCard;

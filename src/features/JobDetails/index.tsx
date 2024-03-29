import { User } from "@prisma/client";
import Button from "components/Button";
import Loading from "components/loading";
import { getSessionUser } from "features/Auth/slice";
import { setEditJob } from "features/ClientAccount/slice";
import { isApplied } from "features/functions";
import { SITE_NAME } from "lib/constants";
import { APP_ROUTES } from "lib/routes";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Applicants from "./components/Applicants";
import CriteriaBlock from "./components/CriteriaBlock";
import JobDescription from "./components/JobDescription";
import ProfileImage from "./components/ProfileImage";
import { applyToJobAction, getJobAction } from "./services";
import { getJob } from "./slice";

function JobDetails() {
  const route = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const parsed = route.query;
  const dispatch = useAppDispatch();
  const {
    data: { user },
  } = useAppSelector(getSessionUser);
  const {
    data: { job, isApplying },
    loading,
    error,
  } = useAppSelector(getJob);

  useEffect(() => {
    dispatch(getJobAction(parsed.id as string));
  }, [parsed.id]);

  const handleApply = async () => {
    const res = await dispatch(applyToJobAction(parsed.id as string));
    if (res.type.includes("apply/job/fulfilled")) {
      //show toast
      setSuccessMessage("Applied");
    }
  };

  const isAppliedToJob = isApplied(user as User, job?.applicants);

  if (loading) {
    return (
      <div className="flex min-h-[500px] p-2 w-full lg:w-12/12 my-0 mx-auto flex-nowrap justify-center items-center">
        <Loading w={10} h={10} color={"base-color"} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-2 w-full lg:w-9/12 my-0 mx-auto relative">
      <Head>
        <title>
          {job?.jobRole} | {SITE_NAME} Jobs
        </title>
      </Head>
      <div>
        <div className="bg-white border border-gray-200 rounded-lg">
          <img
            className="w-full rounded-t-lg max-h-48 bg-cover object-cover"
            src="https://images.pexels.com/photos/262039/pexels-photo-262039.jpeg?cs=srgb&dl=pexels-pixabay-262039.jpg&fm=jpg"
            alt="Manikeen walk-way model"
          />
          <div className="p-5">
            <div className="flex justify-between">
              <ProfileImage
                name={job?.client?.companyName}
                image={
                  job?.client?.user.Media[0] ||
                  "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                }
                title={job?.client?.companyName}
              />

              {/* @ts-ignore */}
              {user?.id ? (
                <>
                  {/* @ts-ignore */}
                  {user?.type === "Model" && job?.isOpen ? (
                    <Button
                      loading={isApplying}
                      loadingText={"Applying..."}
                      onClick={handleApply}
                      className={"w-[50%] h-[50px]"}
                      disabled={!!successMessage || isAppliedToJob}
                    >
                      {successMessage || isAppliedToJob ? "Applied" : "Apply"}
                    </Button>
                  ) : (
                    <Button
                      loading={isApplying}
                      loadingText={"Applying..."}
                      onClick={() => {
                        dispatch(setEditJob(job));
                        Router.push(
                          `${APP_ROUTES.clientProfile}/jobs/${job.id}`
                        );
                      }}
                      className={"w-[50%] h-[50px]"}
                      // disabled={}
                    >
                      {"Edit"}
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  loading={isApplying}
                  loadingText={"Applying..."}
                  onClick={() =>
                    Router.push(`${APP_ROUTES.login}?redirect=${location.href}`)
                  }
                  className={"w-[50%] h-[50px]"}
                  // disabled={!!successMessage || isAppliedToJob}
                >
                  {"Apply"}
                </Button>
              )}
            </div>

            <CriteriaBlock
              data={{
                experience: job?.experience,
                locations: job?.locations,
                fee: job?.fee,
                duration: job?.jobLength,
              }}
            />

            <JobDescription description={job?.jobDescription} />

            <Applicants
              // @ts-ignore
              isClient={user?.type === "Client"}
              applicants={job?.applicants}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;

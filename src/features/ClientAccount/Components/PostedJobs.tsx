import JobCard from "components/JobCard";
import Loading from "components/loading";
import { getSessionUser } from "features/Auth/slice";
import React, { useEffect } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getClientJobsActions } from "../services";
import { getClientJobs } from "../slice";

const PostedJobs = () => {
  const dispatch = useAppDispatch();
  const {
    data: { user },
  }: any = useAppSelector(getSessionUser);
  const {
    data: { clientJobs },
    loading,
    error,
  } = useAppSelector(getClientJobs);

  useEffect(() => {
    if (user.id) {
      dispatch(getClientJobsActions(user.id));
    }
  }, [user.id]);

  return (
    <div>
      <h3 className="text-lg font-semibold">Posted Jobs</h3>
      <div className="flex flex-col py-5">
        {loading && (
          <div className="flex w-full justify-center item-center">
            <div className="flex text-center p-20 flex-col">
              <Loading color="base-color" w={14} h={14} />
            </div>
          </div>
        )}

        {clientJobs && clientJobs.length > 0 ? (
          <div className="grid gap-2 mb-8 rounded-lg md:mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        ) : (
          <div className="flex w-full justify-center item-center">
            <div className="flex text-center p-20 flex-col">
              <HiOutlineDocumentSearch className="mx-auto" size={68} />
              <h1>No Job posted yet</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostedJobs;

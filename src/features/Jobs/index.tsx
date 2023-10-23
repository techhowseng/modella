import { User } from "@prisma/client";
import JobCard from "features/Jobs/JobCard";
import Loading from "components/loading";
import SearchBar from "components/SearchBar";
import Select from "components/Select";
import { getSessionUser } from "features/Auth/slice";
import { getJobs } from "features/ClientAccount/slice";
import { Job } from "features/ClientAccount/types";
import { getJobsActions } from "features/JobDetails/services";
import React, { useEffect, useState, Fragment } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useSearch } from "./hooks";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";

function Jobs() {
   const dispatch = useAppDispatch();
   const {
      data: { user },
   } = useAppSelector(getSessionUser);
   const {
      data: { jobs },
      loading,
      error,
   } = useAppSelector(getJobs);
   const { handleChange, handleSubmit, search, setSearch } = useSearch();

   useEffect(() => {
      handleSubmit({ preventDefault: () => { } });
   }, []);

   if (typeof window === "undefined") return null;

   return (
      <div className="min-h-screen p-2 w-12/12 lg:w-9/12 my-0 mx-auto relative">
         {/* <Navbar /> */}
         {/* <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} /> */}
         <div className="flex item-center w-full mx-auto py-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-lg ">
            {loading && (
               <div className="flex w-full justify-center item-center">
                  <div className="flex text-center p-20 flex-col">
                     <Loading color="base-color" w={14} h={14} />
                  </div>
               </div>
            )}

            <div className="flex flex-col py-5">
               {!loading && jobs && jobs.length > 0 ? (
                  <Fragment>
                     <div className="flex flex-row justify-between pb-5">
                        <h3 className="flex text-sm lg:text-lg font-semibold items-center">
                           <p className="mr-2">Showing {jobs.length} of</p>
                           <Select
                              type="default"
                              options={["10", "20", "30", "40", "50", "100"]}
                              name={"perPage"}
                              onChange={handleChange}
                              className={"bg-transparent w-full !py-1 !px-4"}
                              value={`${search.perPage}`}
                           />
                           <p className="ml-2">Jobs</p>
                        </h3>
                        {/* <div className="flex flex-row items-center space-x-2 text-sm lg:text-lg">
                  <p>Sort by: </p>
                  <Select
                    type="default"
                    options={["Newest", "Last 30 days"]}
                    name={"sortBy"}
                    onChange={handleChange}
                    className={"bg-transparent w-full !py-1 !px-4"}
                    value={search.sortBy}
                  />
                </div> */}
                     </div>
                     <div className="grid gap-2 mb-8 md:mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job: Job) => (
                           <JobCard
                              user={user as User}
                              // @ts-ignore
                              isClient={user.type === "Client"}
                              job={job}
                              key={job.id}
                           />
                        ))}
                     </div>
                  </Fragment>
               ) : !loading ? (
                  <div className="flex w-full justify-center item-center">
                     <div className="flex text-center p-20 flex-col">
                        <HiOutlineDocumentSearch className="mx-auto" size={68} />
                        <h1>No Job Available</h1>
                     </div>
                  </div>
               ) : null}
            </div>
         </div>
      </div>
   );
}

export default Jobs;

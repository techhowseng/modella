import JobCard from "components/JobCard";
import SearchBar from "components/SearchBar";
import Select from "components/Select";
import React, { useState } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";

function Jobs() {
  const [sortValue, setSortValue] = useState("");
  return (
    <div className="flex flex-col justify-center min-h-screen p-2 w-12/12 lg:w-9/12 my-0 mx-auto relative">
        <SearchBar />
      <div className="flex flex-col item-center w-full mx-auto py-6 sm:px-6 lg:px-8 relative overflow-hidden mt-5 rounded-lg ">
        <div className="flex flex-row justify-between">
          <h3 className="flex text-sm lg:text-lg font-semibold items-center">Showing 20 of 100 Jobs</h3>
          <div className="flex flex-row items-center space-x-2 text-sm lg:text-lg">
            <p>Sort by: </p>
            <Select
              type="default"
              options={["Newest", "Last 30 days"]}
              name={"sortBy"}
              onChange={(val: any) => setSortValue(val.target.value)}
              className={"bg-transparent w-full p-1"}
              value={sortValue}
            />
          </div>
        </div>
        <div className="flex flex-col py-5">
          <div className="grid gap-2 mb-8 md:mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
          <div className="flex w-full justify-center item-center">
            <div className="flex text-center p-20 flex-col">
              <HiOutlineDocumentSearch className="mx-auto" size={68} />
              <h1>No Job Available</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;

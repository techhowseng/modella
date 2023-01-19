import JobCard from "components/JobCard";
import React from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import ClientAside from "./Components/ClientAside";
import PostJobBanner from "./Components/PostJobBanner";

function ClientAccountScreen() {
  return (
    <div className="flex flex-row justify-center min-h-screen p-2 w-9/12 my-0 mx-auto">
      <div className="flex flex-col w-4/12 bg-white p-10">
        <ClientAside />
      </div>
      <div className="flex flex-col w-10/12 px-5">
        <main>
          {/* Begin */}
          <PostJobBanner />
          {/* end of code snippet */}

          <div className="flex flex-col item-center bg-white w-full mx-auto py-6 sm:px-6 lg:px-8 justify-between relative overflow-hidden mt-5 rounded-lg border">
            <h3 className="text-lg font-semibold">Posted Jobs</h3>
            <div className="flex flex-col py-5">

              <div className="flex w-full justify-center item-center">
                <div className="flex text-center p-20 flex-col">
                  <HiOutlineDocumentSearch className="mx-auto" size={68} />
                  <h1>No Job posted yet</h1>
                </div>
              </div>
              <div className="grid gap-2 mb-8 rounded-lg md:mb-12 md:grid-cols-2">
                <JobCard />
                <JobCard />
                <JobCard />
              </div>


            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ClientAccountScreen;

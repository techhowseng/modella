import React from "react";
import ClientAside from "./Components/ClientAside";
import PostedJobs from "./Components/PostedJobs";
import PostJobBanner from "./Components/PostJobBanner";

function ClientAccountScreen() {
  return (
    <div className="flex flex-row min-h-screen p-2 w-full lg:w-9/12 my-0 mx-auto relative">
      <div className="flex flex-col w-4/12 bg-white p-10 border rounded-lg hidden lg:block">
        <ClientAside />
      </div>
      <div className="flex flex-col w-full px-0 lg:px-5">
        <main>
          {/* Begin */}
          <PostJobBanner />
          {/* end of code snippet */}

          {/* Begin */}
          <div className="flex flex-col item-center bg-white w-full mx-auto py-6 px-6 lg:px-8 relative overflow-hidden mt-5 rounded-lg border">
            <PostedJobs />
          </div>
          {/* end of code snippet */}
        </main>
      </div>
    </div>
  );
}

export default ClientAccountScreen;

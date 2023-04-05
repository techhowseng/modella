import React, { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import ClientAside from "./Components/ClientAside";
import EditJob from "./Components/EditJob";
import PostedJobs from "./Components/PostedJobs";
import PostJobBanner from "./Components/PostJobBanner";
import { getJobs } from "./slice";

function ClientAccountScreen({ routes }: any) {
  const [activeMenu, setActiveMenu] = useState(1);

  useEffect(() => {
    if (routes?.length > 0 && routes[0] === "messages") {
      setActiveMenu(2);
    } else if (routes?.length > 0 && routes[0] === "models") {
      setActiveMenu(3);
    } else {
      setActiveMenu(1);
    }
  }, [routes]);

  const renderRoute = () => {
    switch (routes[0]) {
      case "messages":
        return (
          <div className="flex flex-col item-center bg-white w-full mx-auto py-6 px-6 lg:px-8 relative overflow-hidden rounded-lg border">
            Message
          </div>
        );
      case "models":
        return (
          <div className="flex flex-col item-center bg-white w-full mx-auto py-6 px-6 lg:px-8 relative overflow-hidden rounded-lg border">
            Models
          </div>
        );
      default:
        return renderMainScreen();
    }
  };

  const renderMainScreen = () => {
    return (
      <>
        {routes && routes[1] && routes[0] === "jobs" ? (
          <EditJob />
        ) : (
          <>
            {/* Begin */}
            <PostJobBanner />
            {/* end of code snippet */}

            {/* Begin */}
            <div className="flex flex-col item-center bg-white w-full mx-auto py-6 px-6 lg:px-8 relative overflow-hidden mt-5 rounded-lg border">
              <PostedJobs />
            </div>
            {/* end of code snippet */}
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-row min-h-screen p-2 w-full lg:w-9/12 my-0 mx-auto relative">
      <div className="flex flex-col w-4/12 bg-white p-10 border rounded-lg hidden lg:block">
        <ClientAside active={activeMenu} />
      </div>
      <div className="flex flex-col w-full px-0 lg:px-5">
        <main>{routes?.length > 0 ? renderRoute() : renderMainScreen()}</main>
      </div>
    </div>
  );
}

export default ClientAccountScreen;

import { getSessionUser } from "features/Auth/slice";
import React from "react";
import { useAppSelector } from "store/hooks";
import DashMenuList from "./DashMenuList";

function ClientAside() {
  const {
    data: { user },
  }: any = useAppSelector(getSessionUser);

  return (
    <div>
      <div className="image w-40 h-40 rounded-full mx-auto bg-gray-300 border">
        <img
          className="w-full rounded-full"
          srcSet="https://randomuser.me/api/portraits/women/12.jpg"
          src="https://randomuser.me/api/portraits/women/12.jpg"
          alt={"Profile banner Image"}
          onLoad={() => console.log("loaded")}
          onError={() => console.log("error")}
        />
      </div>
      <h1 className="text-2xl w-full font-bold mx-auto antialiased text-center capitalize">
        {user.companyName}
      </h1>
      <h5 className="text-md text-inherit w-full mx-auto antialiased text-center mt-2">
        {user.address}
      </h5>

      <div className="flex flex-col justify-start">
        <DashMenuList />
      </div>
    </div>
  );
}

export default ClientAside;

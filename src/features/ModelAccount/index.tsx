import { useGetSessionUser } from "features/hooks";
import React from "react";
import MasonryGallary from "./Components/MasonryGallary";
import ModelProfileAside from "./Components/ModelProfileAside";
import { useGetUser } from "../hooks";

function ModelAccountSreen({ userId }: { userId: string }) {
  const { userData } = useGetSessionUser();
  const { loading, user } = useGetUser(userId);
  const isLoggedInUser = userData.userId === user.userId;

  return (
    <div className="flex flex-row justify-center min-h-screen p-2 w-9/12 my-0 mx-auto">
      <div className="flex flex-col w-4/12 bg-white">
        <ModelProfileAside isLoggedInUser={isLoggedInUser} user={user} />
      </div>
      <div className="flex flex-col w-10/12 px-10">
        <MasonryGallary />
      </div>
    </div>
  );
}

export default ModelAccountSreen;

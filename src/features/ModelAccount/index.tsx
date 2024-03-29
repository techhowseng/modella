import { useGetSessionUser } from "features/hooks";
import React from "react";
import MasonryGallary from "./Components/MasonryGallary";
import ModelProfileAside from "./Components/ModelProfileAside";
import { useGetUser } from "../hooks";
import { useAppSelector } from "store/hooks";
import { getSessionUser } from "features/Auth/slice";

function ModelAccountSreen({ userId }: { userId: string }) {
  const { userData } = useGetSessionUser();
  const { loading, user } = useGetUser(userId, true);
  const {
    loading: mediaLoading,
    profileImageLoading,
    data: { MediaList },
  } = useAppSelector(getSessionUser);

  const isLoggedInUser = userData.userId === user.userId;

  return (
    <div className="flex flex-row justify-center min-h-screen p-2 w-9/12 my-0 mx-auto">
      <div className="flex flex-col w-4/12 bg-white">
        <ModelProfileAside profileImageLoading={profileImageLoading} isLoggedInUser={isLoggedInUser} user={user} />
      </div>
      <div className="flex flex-col w-10/12 px-10">
        <MasonryGallary
          loading={mediaLoading}
          mediaList={MediaList}
          isLoggedInUser={isLoggedInUser}
          user={user}
        />
      </div>
    </div>
  );
}

export default ModelAccountSreen;

import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { useAppSelector } from "store/hooks";
import { getJobs } from "../slice";
import PostJobCreateForm from "./PostJobBanner/PostJobCreateForm";

const EditJob = () => {
  const {
    data: { editJob },
  } = useAppSelector(getJobs);

  return (
    <div>
      <Link
        href={APP_ROUTES.clientProfile}
        className="text-md font-semibold leading-6 text-gray-900 my-20"
      >
        <span aria-hidden="true">&larr;</span> Back
      </Link>
      <PostJobCreateForm defaultValues={editJob} />
    </div>
  );
};

export default EditJob;

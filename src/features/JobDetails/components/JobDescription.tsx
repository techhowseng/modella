import React from "react";

function JobDescription({ description }) {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-xl">Job Description</h1>

      <div className="text-sm font-light text-gray-500 mt-2">{description}</div>
    </div>
  );
}

export default JobDescription;

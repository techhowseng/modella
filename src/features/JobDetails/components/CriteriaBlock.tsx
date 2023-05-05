import Divider from "components/Divider";
import React from "react";

function CriteriaBlock({
  data: { experience, locations, fee, duration },
}: any) {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-xl">Criteria</h1>
      <div className="flex flex-col space-y-2 mt-2">
        <div className="flex flex-row border rounded-lg p-4 overflow-wrap">
          <div className="flex w-full flex-col md:flex-col lg:flex-row items-center justify-evenly">
            <div className="max-w-full text-xl font-light flex flex-col items-center">
              <p className="text-sm">Experience</p>
              <p className="text-center">Minimum {experience}</p>
            </div>
            <Divider />
            <div className="max-w-full text-xl font-light flex flex-col items-center">
              <p className="text-sm">Location</p>
              <p className="text-center" title={locations}>
                {locations}
              </p>
            </div>
            <Divider />
            <div className="max-w-full text-xl font-light flex flex-col items-center">
              <p className="text-sm">Fee</p>
              <p className="text-center">{fee} per hr</p>
            </div>
            <Divider />
            <div className="max-w-full text-xl font-light flex flex-col items-center">
              <p className="text-sm">Duration</p>
              <p className="text-center">{duration}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriteriaBlock;

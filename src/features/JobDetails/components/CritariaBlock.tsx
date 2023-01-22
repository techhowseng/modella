import Divider from "components/Divider";
import React from "react";

function CritariaBlock({ data }) {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-xl">Critaria</h1>
      <div className="flex flex-col space-y-2 mt-2">
        <div className="flex flex-row border rounded-lg p-4 overflow-wrap">
          <div className="flex w-full flex-col md:flex-col lg:flex-row items-center justify-evenly">
            <div className="max-w-full text-xl font-light flex flex-col items-center">
              <p className="text-sm">Experience</p>
              <p className="text-center">Minimum 6 Months</p>
            </div>
            <Divider />
            <div className="max-w-full text-xl font-light flex flex-col items-center">
              <p className="text-sm">Location</p>
              <p className="text-center" title="31b, simpson, Adekunle, Yaba, Lagos, Nigeria">31b, simpson, Adekunle, Yaba, Lagos, Nigeria</p>
            </div>
            <Divider />
            <div className="max-w-full text-xl font-light flex flex-col items-center">
              <p className="text-sm">Salary</p>
              <p className="text-center">N200,000 per hr</p>
            </div>
            <Divider />
            <div className="max-w-full text-xl font-light flex flex-col items-center">
              <p className="text-sm">Duration</p>
              <p className="text-center">2 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CritariaBlock;

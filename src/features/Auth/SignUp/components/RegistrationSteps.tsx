import React from "react";

function RegistrationSteps() {
  return (
    <div className="flex flex-row w-full my-20">
      <div className="grid grid-cols-4 w-full">
        <div className="w-full h-1 base-bg-color rounded">
          <p className="mt-2">Step 1</p>
        </div>
        <div className="w-full h-1 base-bg-color rounded">
          <p className="mt-2">Step 2</p>
        </div>
        <div className="w-full h-1 base-bg-color rounded">
          <p className="mt-2">Step 3</p>
        </div>
        <div className="w-full h-1 base-bg-color rounded">
          <p className="mt-2">Step 4</p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSteps;

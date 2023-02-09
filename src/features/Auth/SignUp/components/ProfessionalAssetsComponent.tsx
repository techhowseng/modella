import Button from "components/Button";
import React from "react";
import { BsPlusCircle } from "react-icons/bs";

function ProfessionalAssetsComponent() {
  return (
    <div className="flex-1">
      <div className="flex flex-col">
        <h1 className="text-3xl mb-5 font-bold">
          Great, you are almost there.
        </h1>
        <div className="flex flex-row">
          <p className="mr-1">
            Please upload 5 of your professional photos of yourself or your
            works
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-10 border rounded-xl p-6">
        <p>Click to select files or drag and drop</p>
        <BsPlusCircle className="my-10" size={58} />
        <p>Upload</p>
      </div>
      {/* <!---dskdlksld---> */}
    </div>
  );
}

export default ProfessionalAssetsComponent;

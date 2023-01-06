import Button from "components/Button";
import React from "react";
import { BsPlusCircle } from "react-icons/bs";

function ProfessionalAssetsComponent() {
  return (
    <div className="flex-1 py-20 md:py-30 lg:py-36 px-10 lg:px-38 md:px-20 h-full flex flex-col justify-center">
      <div className="flex flex-col">
        <h1 className="text-5xl mb-10 font-bold">
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

      <Button className="mt-10" onClick={() => {}}>
        <p className="text-white">Next</p>
      </Button>
      {/* <!---dskdlksld---> */}
    </div>
  );
}

export default ProfessionalAssetsComponent;

import React from "react";
import ModelAttributes from "./components/ModelAttributes";
import PersonalInformation from "./components/PersonalInformation";
import SocialForm from "./components/SocialForm";

function BioDataForm() {
  return (
    <div className="flex flex-col justify-center min-h-screen p-2 w-full lg:w-9/12 my-0 mx-auto">
      <PersonalInformation />

      {/* Divider */}
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      {/* End Divider */}

      <ModelAttributes />

      {/* Divider */}
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      {/* End Divider */}

      <SocialForm />
    </div>
  );
}

export default BioDataForm;

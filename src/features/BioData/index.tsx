import { getSessionUser } from "features/Auth/slice";
import { useGetUser } from "features/hooks";
import React from "react";
import ModelAttributes from "./components/ModelAttributes";
import PersonalInformation from "./components/PersonalInformation";
import SocialForm from "./components/SocialForm";

function BioDataForm() {
  const { loading, user } = useGetUser("user");
  // console.log("🚀 ~ file: index.tsx:10 ~ BioDataForm ~ user", user);

  if (!user.id && loading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen p-2 w-full lg:w-9/12 my-0 mx-auto">
      <PersonalInformation
        bio={user.bio}
        phone={user?.phone?.phone_1 || user?.phone?.number_1}
        dob={user.DOB}
      />

      {/* Divider */}
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      {/* End Divider */}

      <ModelAttributes userData={user} />

      {/* Divider */}
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      {/* End Divider */}

      <SocialForm socials={user?.social} />
    </div>
  );
}

export default BioDataForm;

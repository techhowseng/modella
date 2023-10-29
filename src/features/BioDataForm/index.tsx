import Loading from "components/loading";
import { getSessionUser } from "features/Auth/slice";
import { useGetUser } from "features/hooks";
import React from "react";
import ModelAttributes from "./components/ModelAttributes";
import PersonalInformation from "./components/PersonalInformation";
import SocialForm from "./components/SocialForm";

function BioDataForm() {
  const { loading, user } = useGetUser("user");

  if (!user.id && loading) {
    return (
      <div className="flex w-full justify-center item-center">
        <div className="flex text-center p-20 flex-col">
          <Loading color="base-color" w={14} h={14} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center min-h-screen p-2 w-full lg:w-9/12 my-0 mx-auto">
      <PersonalInformation
        userData={user}
        bio={user.bio}
        phone={user?.phone || user?.phone?.phone_1 || user?.phone?.number_1}
        dob={user.dob}
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

      <SocialForm userData={user} socials={user?.social} />
    </div>
  );
}

export default BioDataForm;

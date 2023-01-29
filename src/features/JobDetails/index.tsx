import React from "react";
import Applicants from "./components/Applicants";
import CritariaBlock from "./components/CritariaBlock";
import JobDescription from "./components/JobDescription";
import ProfileImage from "./components/ProfileImage";

function JobDetails() {
  return (
    <div className="flex flex-col min-h-screen p-2 w-full lg:w-9/12 my-0 mx-auto relative">
      <div>
        <div className="bg-white border border-gray-200 rounded-lg">
          <img
            className="w-full rounded-t-lg max-h-48 bg-cover object-cover"
            src="https://flowbite.com/docs/images/blog/image-4.jpg"
            alt=""
          />
          <div className="p-5">
            <ProfileImage
              name={"Bonnie Green"}
              image={
                "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
              }
              title={"Developer at Open AI"}
            />

            <CritariaBlock data={{}} />

            <JobDescription
              description={`A new clothing branch is been lunched into the market and is in need of
        proffesional models for photoshoots with the cloths A new clothing
        branch is been lunched into the market and is in need of proffesional
        models for photoshoots with the cloths A new clothing branch is been
        lunched into the market and is in need of proffesional models for
        photoshoots with the cloths....`}
            />

            <Applicants
              applicants={[
                {
                  name: "Bonnie Green",
                  image:
                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
                  title: "Developer at Open AI",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;

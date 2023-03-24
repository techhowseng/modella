import Button from "components/Button";
import Loading from "components/loading";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Applicants from "./components/Applicants";
import CriteriaBlock from "./components/CriteriaBlock";
import JobDescription from "./components/JobDescription";
import ProfileImage from "./components/ProfileImage";
import { applyToJobAction, getJobAction } from "./services";
import { getJob } from "./slice";

function JobDetails() {
  // const [loading, setLoading] = useState(false);
  const route = useRouter();
  const parsed = route.query;
  const dispatch = useAppDispatch();
  const {
    data: { job, isApplying },
    loading,
    error,
  } = useAppSelector(getJob);
  console.log("🚀 ~ file: index.tsx:21 ~ JobDetails ~ job", job);

  useEffect(() => {
    dispatch(getJobAction(parsed.id as string));
  }, [parsed.id]);

  const handleApply = () => {
    dispatch(applyToJobAction(job?.id));
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] p-2 w-full lg:w-12/12 my-0 mx-auto flex-nowrap justify-center items-center">
        <Loading w={10} h={10} color={"base-color"} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-2 w-full lg:w-9/12 my-0 mx-auto relative">
      <div>
        <div className="bg-white border border-gray-200 rounded-lg">
          <img
            className="w-full rounded-t-lg max-h-48 bg-cover object-cover"
            src="https://images.pexels.com/photos/262039/pexels-photo-262039.jpeg?cs=srgb&dl=pexels-pixabay-262039.jpg&fm=jpg"
            alt=""
          />
          <div className="p-5">
            <div className="flex justify-between">
              <ProfileImage
                name={"Bonnie Green"}
                image={
                  "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                }
                title={"Developer at Open AI"}
              />

              <Button
                loading={isApplying}
                loadingText={"Applying..."}
                onClick={handleApply}
                className={"w-[50%] h-[50px]"}
              >
                {"Apply"}
              </Button>
            </div>

            <CriteriaBlock
              data={{
                experience: job?.isOpen,
                location: job?.location,
                salary: job?.salary,
                duration: job?.jobLength,
              }}
            />

            <JobDescription description={job?.jobDescription} />

            <Applicants
              applicants={[
                {
                  id: 1,
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

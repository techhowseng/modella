import Button from "components/Button";
import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import bannerBG from "assets/bannerBg.svg";

function PostJobBanner() {
  return (
    <div className="z-10 border rounded-lg flex item-center bg-white w-full mx-auto py-6 sm:px-6 lg:px-8 justify-between relative overflow-hidden">
      <div className="flex space-x-6">
        <div className="flex items-center">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <svg
              aria-hidden="true"
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Fire icon</span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-2xl">Welcome back, Joyce</h1>
          <h3 className="text-md">You haven't posted a job in a while now. Create a Job</h3>
        </div>
      </div>

      <div className="flex flex-row z-10">
        <Button
          type="button"
          onClick={() => console.log("Post a job")}
          className="bg-transparent text-white hover:bg-transparent md:w-[0px] lg:w-[0px] mr-10"
        >
          <MdAddCircleOutline size={54} />
        </Button>
      </div>

      <img
        className="absolute right-[-400px] top-[-100px] z-0"
        src={bannerBG.src}
        alt="banner background image"
      />
    </div>
  );
}

export default PostJobBanner;

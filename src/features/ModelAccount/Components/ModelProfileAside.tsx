import Button from "components/Button";
import Rating from "components/Rating";
import React from "react";

function ModelProfileAside() {
  return (
    <div>
      <div className="image w-40 h-40 rounded-full mx-auto bg-gray-300">
        <img
          className="w-full rounded-full"
          srcSet="https://randomuser.me/api/portraits/women/12.jpg"
          src="https://randomuser.me/api/portraits/women/12.jpg"
          alt={"Profile banner Image"}
          onLoad={() => console.log("loaded")}
          onError={() => console.log("error")}
        />
      </div>
      <h1 className="text-2xl w-full font-bold mx-auto antialiased text-center capitalize">
        Jessica King's
      </h1>
      <h5 className="text-md text-inherit w-full mx-auto antialiased text-center mt-2">
        Professional Model
      </h5>
      <div className="flex flex-row justify-center my-2">
        <Rating rating={5} />
      </div>
      <div className="flex flex-row justify-between	mt-3">
        <Button onClick={undefined}>Select</Button>
        <div className="w-3" />
        <Button onClick={undefined}>Hire</Button>
      </div>
      <div className="flex flex-col justify-start">
        <div className="mt-10">
          <h1 className="text-xl font-bold">Location</h1>
          <p className="text-md text-inherit">
            Canterbury, plot44 Yankpaja VI lagos.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="text-xl font-bold">Portfolio Website</h1>
          <p className="text-md text-inherit">http//disha@roseshaw</p>
        </div>
        <div className="mt-10">
          <h1 className="text-xl font-bold">Bio</h1>
          <p className="text-md text-inherit">
            I am an extrovert that loves what i do, i model for magazine covers,
            runway shoots and so many more, please do well to check my Gallery,
            i upload
          </p>
        </div>
        <div className="mt-10">
          <h1 className="text-xl font-bold">Creator’s style</h1>
          <p className="text-md text-inherit">
            Run-way shoots, coverpage shoots, potrati face modelling
          </p>
        </div>
        <div className="mt-10">
          <h1 className="text-xl font-bold">Activity</h1>
          <p className="text-md text-inherit">Proffesional model</p>
        </div>
      </div>
    </div>
  );
}

export default ModelProfileAside;

import React from "react";

function SideDisplay() {
  return (
    <div
      className="flex-1 p-8 lg:p-30 md:p-24 h-full flex flex-col justify-end"
      style={{
        background:
          "url(https://res.cloudinary.com/dcbqn1c10/image/upload/v1672934858/drop_chlak9.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-white text-7xl mb-10 font-bold">Modella</h1>
      <div className="flex flex-col text-white">
        <h1 className="text-2xl lg:text-4xl mb-10 w-2/2">
          Your access to top notch proffesional services.
        </h1>
        <p className="text-base">
          Its great having to see you again, hope you had a great time with us
          please input your login details to continue.
        </p>
      </div>
    </div>
  );
}

export default SideDisplay;

import React from "react";

function Divider({
  orientation,
}: {
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "horizontal") {
    return (
      <hr
        aria-orientation="horizontal"
        className="h-px w-full my-2 bg-gray-200"
      />
    );
  }

  if (orientation === "vertical") {
    return (
      <hr
        aria-orientation="vertical"
        className="h-full w-px my-2 bg-gray-200"
      />
    );
  }
  return (
    <hr aria-orientation="horizontal" className="lg:h-full w-full sm:w-px lg:h-px my-4 lg:mx-2 bg-gray-200" />
  );
}

export default Divider;

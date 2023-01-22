import Jobs from "features/Jobs";
import HeaderFooter from "layouts/HeaderFooter";
import React from "react";

function JobsPage() {
  return (
    <HeaderFooter title={"Available Jobs | Modella"}>
      <Jobs />
    </HeaderFooter>
  );
}

export default JobsPage;

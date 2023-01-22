import JobDetails from "features/JobDetails";
import HeaderFooter from "layouts/HeaderFooter";
import React from "react";

function JobDetailsPage() {
  return (
    <HeaderFooter title={"Andela AD | Modella Jobs"}>
      <JobDetails />
    </HeaderFooter>
  );
}

export default JobDetailsPage;

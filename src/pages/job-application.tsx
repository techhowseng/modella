import JobApplicationForm from "features/JobApplication";
import HeaderFooter from "layouts/HeaderFooter";
import React from "react";

function JobApplication() {
  return (
    <HeaderFooter title={"Job Application | Modella"}>
      <JobApplicationForm />
    </HeaderFooter>
  );
}

export default JobApplication;

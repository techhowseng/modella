import JobDetails from "features/JobDetails";
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React from "react";

function JobDetailsPage() {
  return (
    <HeaderFooter title={`Andela AD | ${SITE_NAME} Jobs`}>
      <JobDetails />
    </HeaderFooter>
  );
}

export default JobDetailsPage;

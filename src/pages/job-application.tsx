import JobApplicationForm from "features/JobApplication";
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React from "react";

function JobApplication() {
   return (
      <HeaderFooter title={`Job Application | ${SITE_NAME}`}>
         <JobApplicationForm />
      </HeaderFooter>
   );
}

export default JobApplication;

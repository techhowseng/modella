import Jobs from "features/Jobs";
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React from "react";

function JobsPage() {
  return (
    <HeaderFooter title={`Available Jobs | ${SITE_NAME}`} authenticate={false}>
      <Jobs />
    </HeaderFooter>
  );
}

export default JobsPage;

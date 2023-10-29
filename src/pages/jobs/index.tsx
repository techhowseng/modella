import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import Jobs from "features/Jobs"



function jobsPage() {
   return (
      <HeaderFooter title={`Jobs | ${SITE_NAME}`}>n
         <Jobs />
      </HeaderFooter>
   );
}

export default jobsPage;

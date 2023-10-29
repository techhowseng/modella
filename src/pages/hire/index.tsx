import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import Hire from "features/Hire"



function hirePage() {
   return (
      <HeaderFooter title={`Hire | ${SITE_NAME}`}>
         <Hire />
      </HeaderFooter>
   );
}

export default hirePage;

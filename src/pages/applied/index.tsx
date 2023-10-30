import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import Applied from "features/Applied"



function appliedPage() {
   return (
      <HeaderFooter title={`Applied Jobs | ${SITE_NAME}`}>n
         <Applied />
      </HeaderFooter>
   );
}

export default appliedPage;

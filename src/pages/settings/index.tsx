import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import Settings from "features/Settings"



function SettingsPage() {
   return (
      <HeaderFooter title={`Settings | ${SITE_NAME}`}>
         <Settings />
      </HeaderFooter>
   );
}

export default SettingsPage;

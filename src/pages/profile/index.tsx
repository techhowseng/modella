import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import Profile from "features/Profile"



function ProfilePage() {
   return (
      <HeaderFooter title={`Profile | ${SITE_NAME}`}>
         <Profile />
      </HeaderFooter>
   );
}

export default ProfilePage;

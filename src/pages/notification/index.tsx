import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import Notification from "features/Notification"



function NotificationPage() {
   return (
      <HeaderFooter title={`Notifcations | ${SITE_NAME}`}>
         <Notification />
      </HeaderFooter>
   );
}

export default NotificationPage;

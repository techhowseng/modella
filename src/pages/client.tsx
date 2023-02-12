import ClientAccountScreen from "features/ClientAccount";
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React from "react";

function ClientPage() {
  return (
    <HeaderFooter title={`Client profile page | ${SITE_NAME}`}>
      <ClientAccountScreen />
    </HeaderFooter>
  );
}

export default ClientPage;

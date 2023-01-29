import ClientAccountScreen from "features/ClientAccount";
import HeaderFooter from "layouts/HeaderFooter";
import React from "react";

function ClientPage() {
  return (
    <HeaderFooter title={"Client profile page | Modella"}>
      <ClientAccountScreen />
    </HeaderFooter>
  );
}

export default ClientPage;

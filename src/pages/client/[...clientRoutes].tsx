import ClientAccountScreen from "features/ClientAccount";
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import { useRouter } from "next/router";
import React from "react";

function ClientPage() {
  const routes = useRouter();

  return (
    <HeaderFooter title={`Client profile page | ${SITE_NAME}`}>
      <ClientAccountScreen routes={routes.query.clientRoutes} />
    </HeaderFooter>
  );
}

export default ClientPage;

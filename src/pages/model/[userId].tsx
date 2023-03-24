import ModelAccountSreen from "features/ModelAccount";
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import { useRouter } from "next/router";
import React from "react";

function ModelPage() {
  const { query } = useRouter();

  return (
    <HeaderFooter title={`Model profile page | ${SITE_NAME}`}>
      <ModelAccountSreen userId={query.userId as string} />
    </HeaderFooter>
  );
}

export default ModelPage;

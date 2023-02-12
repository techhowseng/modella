import ModelAccountSreen from "features/ModelAccount";
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React from "react";

function ModelPage() {
  return (
    <HeaderFooter title={`Model profile page | ${SITE_NAME}`}>
      <ModelAccountSreen />
    </HeaderFooter>
  );
}

export default ModelPage;

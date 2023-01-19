import ModelAccountSreen from "features/ModelAccount";
import HeaderFooter from "layouts/HeaderFooter";
import React from "react";

function ModelPage() {
  return (
    <HeaderFooter title={"Model profile page | Modella"}>
      <ModelAccountSreen />
    </HeaderFooter>
  );
}

export default ModelPage;

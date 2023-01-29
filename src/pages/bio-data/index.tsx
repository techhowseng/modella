import BioDataForm from "features/BioData";
import HeaderFooter from "layouts/HeaderFooter";
import React from "react";

function BioDataFormPage() {
  return (
    <HeaderFooter title={"Bio Data | Modella"}>
      <BioDataForm />
    </HeaderFooter>
  );
}

export default BioDataFormPage;

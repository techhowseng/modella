import BioDataForm from "features/BioData";
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React from "react";

function BioDataFormPage() {
  return (
    <HeaderFooter title={`Bio Data | ${SITE_NAME}`}>
      <BioDataForm />
    </HeaderFooter>
  );
}

export default BioDataFormPage;

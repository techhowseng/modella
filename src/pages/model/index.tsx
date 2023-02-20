import { useGetSessionUser } from "features/hooks";
import ModelAccountSreen from "features/ModelAccount";
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React from "react";

function ModelPage() {
  const { userData } = useGetSessionUser();

  return (
    <HeaderFooter title={`Model profile page | ${SITE_NAME}`}>
      <ModelAccountSreen userId={userData.userId} />
    </HeaderFooter>
  );
}

export default ModelPage;

export const getServerProps = () => {
  
};

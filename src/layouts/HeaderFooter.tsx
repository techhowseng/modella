import Header from "components/Header";
import React from "react";

function HeaderFooter({ children }) {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
}

export default HeaderFooter;

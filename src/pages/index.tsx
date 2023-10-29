import React from "react";
import Home from "features/Home";
import Head from "next/head";
import { SITE_HOME_TITLE } from "lib/constants";

type Props = {};

const HomePage: React.FC<Props> = (props) => {
   return (
      <>
         <Head>
            <title>{SITE_HOME_TITLE}</title>
         </Head>
         <Home />
      </>
   );
};

export default HomePage;

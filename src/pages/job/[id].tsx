import JobDetails from "features/JobDetails";
import { getJobService } from "features/JobDetails/services";
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import { isServerRequest } from "lib/nextjs";
import { NextPageContext } from "next";
import React from "react";

function JobDetailsPage(props: any) {
  return (
    <HeaderFooter title={`${props.jobRole} | ${SITE_NAME} Jobs`}>
      <JobDetails />
    </HeaderFooter>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  // no props need to be sent back down for SPA navigates
  // only initial page render
  if (!isServerRequest(ctx) || typeof window !== "undefined") {
    return { props: {} };
  }

  const {
    query: { id },
    res,
  } = ctx;

  try {
    let jobResponse = await getJobService(id as string);

    return { props: { ...jobResponse } };
  } catch (e) {
    return { props: {} };
  }
};

export default JobDetailsPage;

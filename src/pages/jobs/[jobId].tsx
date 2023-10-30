import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import JobDetail from "features/JobDetail"



function hjobDetailsPage() {
   return (
      <HeaderFooter title={`Available Job | ${SITE_NAME}`}>
         <JobDetail />
      </HeaderFooter>
   );
}

export default hjobDetailsPage;

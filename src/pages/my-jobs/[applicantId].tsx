import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import Applicant from "features/Applicant";
import { recomData } from "dummyData";



function ApplicantPage() {
   return (
      <HeaderFooter title={`Applicant | ${SITE_NAME}`}>
         <Applicant />
      </HeaderFooter>
   );
}

export default ApplicantPage;
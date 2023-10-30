import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import AppliedDetails from "features/AppliedDetails";



function appliedPage() {
   return (
      <HeaderFooter title={`Applied Job | ${SITE_NAME}`}>
         <AppliedDetails />
      </HeaderFooter>
   );
}

export default appliedPage;
import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import Message from "features/Message"



function MessagePage() {
   return (
      <HeaderFooter title={`Messages | ${SITE_NAME}`}>
         <Message />
      </HeaderFooter>
   );
}

export default MessagePage;

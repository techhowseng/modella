import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import Chat from "features/Chat"



function ChatPage() {
   return (
      <HeaderFooter title={`Message | ${SITE_NAME}`}>
         <Chat />
      </HeaderFooter>
   );
}

export default ChatPage;

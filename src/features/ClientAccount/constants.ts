import {
  AiOutlineDashboard,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdOutlineCases } from "react-icons/md";

export const CLIENT_ACCOUNT_MENU_ITEMS = [
  {
    name: "Dashboard",
    icon: AiOutlineDashboard,
    link: "/client/dashboard",
  },
  {
    name: "Message",
    icon: AiOutlineMessage,
    link: "/client/messages",
  },
  {
    name: "Posted Jobs",
    icon: MdOutlineCases,
    link: "/client/posted-jobs",
  },
  {
    name: "Hire Creators",
    icon: AiOutlineDashboard,
    link: "/client/hire-creators",
  },
  {
    name: "Settings",
    icon: AiOutlineSetting,
    link: "/client/settings",
  },
  {
    name: "Logout",
    icon: AiOutlineLogout,
    link: "/client/logout",
  },
];

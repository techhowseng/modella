import {
  AiOutlineDashboard,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdOutlineCases } from "react-icons/md";

export const CLIENT_ACCOUNT_MENU_ITEMS = [
  // {
  //   name: "Dashboard",
  //   icon: AiOutlineDashboard,
  //   link: "/client/dashboard",
  // },
  {
    name: "Posted Jobs",
    icon: MdOutlineCases,
    link: "/client/jobs",
  },
  {
    name: "Messages",
    icon: AiOutlineMessage,
    link: "/client/messages",
  },
  {
    name: "Hired Models",
    icon: AiOutlineDashboard,
    link: "/client/models",
  },
  // {
  //   name: "Settings",
  //   icon: AiOutlineSetting,
  //   link: "/client/settings",
  // },
  // {
  //   name: "Logout",
  //   icon: AiOutlineLogout,
  //   link: "/client/logout",
  // },
];

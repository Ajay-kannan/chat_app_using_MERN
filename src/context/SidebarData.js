import { BiHomeAlt2 } from "react-icons/bi";
import { TbMessage2 } from "react-icons/tb";
import { AiOutlineFileText } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
export const SidebarData = [
  {
    title: "Home",
    icon: <BiHomeAlt2 />,
    link: "/home",
  },
  {
    title: "Message",
    icon: <TbMessage2 />,
    link: "/message",
  },
  {
    title: "Application",
    icon: <AiOutlineFileText />,
    link: "/application",
  },
  {
    title: "Find Jobs",
    icon: <BiSearch />,
    link: "/find",
  },
  {
    title: "Profile",
    icon: <BsPerson />,
    link: "/profile",
  },
  {
    title: "Settings",
    icon: <AiOutlineSetting />,
    link: "/setting",
  },
];

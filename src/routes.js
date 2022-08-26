import React from "react";

import { Icon } from "@chakra-ui/react";
import { MdPerson, MdHome } from "react-icons/md";
import { BsNewspaper } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";

// home Imports
import MainDashboard from "./views/admin/default";
import NFTMarketplace from "./views/admin/marketplace";
import Profile from "./views/admin/profile";
import DataTables from "./views/admin/dataTables";
import { FaNewspaper } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/",
    path: "/",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    Component: MainDashboard,
  },
  {
    name: "News Channels",
    layout: "/",
    icon: <Icon as={BsNewspaper} width="20px" height="20px" color="inherit" />,
    path: "/news-channels",
    Component: DataTables,
  },
  {
    name: "Web Channels",
    layout: "/",
    icon: (
      <Icon as={AiOutlineGlobal} width="20px" height="20px" color="inherit" />
    ),
    path: "/web-channels",
    Component: DataTables,
  },
  {
    name: "News",
    layout: "/",
    icon: <Icon as={FaNewspaper} width="20px" height="20px" color="inherit" />,
    path: "/news",
    Component: NFTMarketplace,
  },
  {
    name: "Logs",
    layout: "/",
    icon: <Icon as={FiSettings} width="20px" height="20px" color="inherit" />,
    path: "/logs",
    Component: DataTables,
  },
];

export default routes;

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

const routes = [
  {
    name: "Main Dashboard",
    layout: "/",
    path: "/",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: "News Channels",
    layout: "/",
    icon: <Icon as={BsNewspaper} width="20px" height="20px" color="inherit" />,
    path: "/news-channels",
    component: <DataTables />,
  },
  {
    name: "Web Channels",
    layout: "/",
    icon: (
      <Icon as={AiOutlineGlobal} width="20px" height="20px" color="inherit" />
    ),
    path: "/web-channels",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
];

export default routes;

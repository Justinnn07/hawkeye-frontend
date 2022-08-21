/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Progress,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports({ data }) {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetch("https://hawkeye-1.herokuapp.com/twitter/data")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      });
  }, []);
  return (
    <>
      {data.channel ? (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 2 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total News Channels"
              value={data?.channel?.length}
            />

            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdFileCopy}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Web Channels"
              value={data.website ? data?.website.length : []}
            />
          </SimpleGrid>

          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 2 }}
            gap="20px"
            mb="20px"
          ></SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <ComplexTable
              tableData={data?.channel ? data?.channel : []}
              columnsData={columnsDataComplex}
              type="news"
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px">
              <PieCard />
            </SimpleGrid>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <ComplexTable
              tableData={data?.website ? data?.website : []}
              columnsData={columnsDataComplex}
              type="web"
            />
            <Tasks tweets={tweets.slice(0, 9)} />
          </SimpleGrid>
        </Box>
      ) : (
        <div style={{ margin: 30 }}>
          <Progress style={{ width: 700 }} isIndeterminate />
        </div>
      )}
    </>
  );
}

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
  Text,
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Map from "react-map-gl";
import Card from "components/card/Card";

export default function UserReports({ data, tweets }) {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [analytis, setAnalytis] = useState([
    {
      id: "1",
      Icon: <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />,
      name: "Total News Channels",
      value: data?.channel?.length,
    },
    {
      id: "2",
      Icon: <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />,
      name: "Total Web Channels",
      value: data?.website ? data?.website.length : [],
    },
  ]);
  const [secondAnalytics, setSecondAnalytics] = useState([]);
  const [thirdAnalytics, setThirdAnalytics] = useState([
    {
      id: "first",
      Component: (
        <ComplexTable
          tableData={data?.website ? data?.website : []}
          columnsData={columnsDataComplex}
          type="web"
        />
      ),
    },
    {
      id: "second",
      Component: <Tasks tweets={tweets.slice(0, 9)} />,
    },
  ]);

  useEffect(() => {
    if (data.website) {
      setThirdAnalytics([
        {
          id: "first",
          Component: (
            <ComplexTable
              tableData={data?.website ? data?.website : []}
              columnsData={columnsDataComplex}
              type="web"
            />
          ),
        },
        {
          id: "second",
          Component: <Tasks tweets={tweets.slice(0, 9)} />,
        },
      ]);
    }
  }, [data.website]);
  useEffect(() => {
    if (data.channel) {
      setSecondAnalytics([
        {
          id: "1",
          Component: (
            <ComplexTable
              tableData={data?.channel ? data?.channel : []}
              columnsData={columnsDataComplex}
              type="news"
            />
          ),
        },
        {
          id: "2",
          Component: (
            <SimpleGrid
              columns={{ base: 1, md: 1, xl: 0.5 }}
              sx={{ height: 430 }}
              gap="20px"
            >
              <Card
                sx={{
                  "&>*": {
                    margin: 1,
                  },
                }}
              >
                <Flex>
                  <Text fontSize="lg" fontWeight={700} color={textColor}>
                    Map
                  </Text>
                </Flex>
                <Map
                  initialViewState={{
                    latitude: 10.8505,
                    longitude: 76.2711,
                    zoom: 6,
                  }}
                  style={{ width: "100%", height: "100%" }}
                  mapStyle="mapbox://styles/mapbox/dark-v9"
                  mapboxAccessToken="pk.eyJ1IjoianVzdGlubm4wNyIsImEiOiJja2hjOHh2amowNW9kMnVub3VmcmVja210In0.9Yf8r2YIHGiBnrtBGN-LkA"
                />
              </Card>
            </SimpleGrid>
          ),
        },
      ]);
    }
  }, [data.channel]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      analytis,
      result.source.index,
      result.destination.index
    );

    setAnalytis(items);
  };

  const onDragEndSecond = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      secondAnalytics,
      result.source.index,
      result.destination.index
    );
    setSecondAnalytics(items);
  };

  const onDragEndThird = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      thirdAnalytics,
      result.source.index,
      result.destination.index
    );

    setThirdAnalytics(items);
  };

  return (
    <>
      {data.channel ? (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provider) => (
                <div ref={provider.innerRef} {...provider.droppableProps}>
                  <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3, "2xl": 2 }}
                    gap="20px"
                    mb="20px"
                  >
                    {analytis.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(providers) => (
                          <div
                            ref={providers.innerRef}
                            {...providers.draggableProps}
                            {...providers.dragHandleProps}
                          >
                            <MiniStatistics
                              startContent={
                                <IconBox
                                  w="56px"
                                  h="56px"
                                  bg={boxBg}
                                  icon={item.Icon}
                                />
                              }
                              name={item.name}
                              value={
                                item.id === "1"
                                  ? data?.channel.length
                                  : data?.website.length
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </SimpleGrid>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <DragDropContext onDragEnd={onDragEndSecond}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provider) => (
                <div ref={provider.innerRef} {...provider.droppableProps}>
                  <SimpleGrid
                    columns={{ base: 1, md: 1, xl: 2 }}
                    gap="20px"
                    mb="20px"
                  >
                    {secondAnalytics.map(({ Component, id }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(providers) => (
                          <div
                            ref={providers.innerRef}
                            {...providers.draggableProps}
                            {...providers.dragHandleProps}
                          >
                            {Component}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </SimpleGrid>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <DragDropContext onDragEnd={onDragEndThird}>
            <Droppable droppableId="droppables" direction="horizontal">
              {(provider) => (
                <SimpleGrid
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                  columns={{ base: 1, md: 1, xl: 2 }}
                  gap="20px"
                  mb="20px"
                >
                  {thirdAnalytics.map(({ id, Component }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {Component}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </SimpleGrid>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      ) : (
        <div style={{ margin: 30 }}>
          <Progress style={{ width: 700 }} isIndeterminate />
        </div>
      )}
    </>
  );
}

import {
  Avatar,
  Box,
  Button,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

function TopCreatorTable({ data }) {
  const textColor = useColorModeValue("navy.700", "white");

  console.log(data);

  return (
    <>
      <Flex
        direction="column"
        w="100%"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify="space-between"
          w="100%"
          px="22px"
          pb="20px"
          mb="10px"
          boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.26)"
        >
          <Text color={textColor} fontSize="xl" fontWeight="600">
            Top Creators
          </Text>
        </Flex>
        <Table variant="simple" color="gray.500">
          <Thead>
            <Tr>
              <Th pe="10px" borderColor="transparent">
                <Flex
                  justify="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                >
                  Name
                </Flex>
              </Th>
              <Th pe="10px" borderColor="transparent">
                <Flex
                  justify="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                  sx={{ marginLeft: 19 }}
                >
                  Social
                </Flex>
              </Th>
              <Th pe="10px" borderColor="transparent">
                <Flex
                  justify="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                >
                  Channel
                </Flex>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map(({ name, instagram, facebook, twitter, channel }) => (
              <Tr>
                <Th>
                  <Flex align="center">{name}</Flex>
                </Th>
                <Th>
                  <Flex align="center" justifyContent="center">
                    <Text
                      color={textColor}
                      fontSize="sm"
                      fontWeight="700"
                      sx={{
                        display: "flex",
                        "& > *": {
                          margin: 2,
                        },
                      }}
                    >
                      {facebook !== null ? (
                        <a href={`${facebook}`} target="_blank">
                          <MdFacebook style={{ fontSize: 20 }} />
                        </a>
                      ) : null}
                      {instagram !== null ? (
                        <a target="_blank" href={`${instagram}`}>
                          <FaInstagram style={{ fontSize: 20 }} />
                        </a>
                      ) : null}
                      {twitter !== null ? (
                        <a target="_blank" href={`${twitter}`}>
                          <BsTwitter style={{ fontSize: 20 }} />
                        </a>
                      ) : null}
                    </Text>
                  </Flex>
                </Th>
                <Th>
                  <Flex align="center">
                    <Text color={textColor}>{channel}</Text>
                  </Flex>
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default TopCreatorTable;

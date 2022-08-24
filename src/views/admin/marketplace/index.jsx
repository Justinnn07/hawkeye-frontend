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

import React, { useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import { useEffect } from "react";
import { Progress } from "@chakra-ui/react";

export default function Marketplace() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=92c9c3447cec471ca4a1948f87026acb"
    )
      .then((res) => res.json())
      .then((data) => setData(data.articles));

    fetch("https://kiran-server-hawkey.vercel.app/top-users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
          {/* Main Fields */}
          <Grid
            mb="20px"
            gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
            gap={{ base: "20px", xl: "20px" }}
            display={{ base: "block", xl: "grid" }}
          >
            <Flex
              flexDirection="column"
              gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
            >
              <Flex direction="column">
                <Flex
                  mb="20px"
                  justifyContent="space-between"
                  direction={{ base: "column", md: "row" }}
                  align={{ base: "start", md: "center" }}
                >
                  <Text
                    color={textColor}
                    fontSize="2xl"
                    ms="24px"
                    fontWeight="700"
                  >
                    Trending News
                  </Text>
                </Flex>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                  {data.map(({ author, title, urlToImage, url }) => (
                    <NFT
                      name={title}
                      author={`By ${author}`}
                      image={
                        urlToImage
                          ? urlToImage
                          : "https://image.shutterstock.com/image-photo/black-alphabet-letter-word-null-260nw-1968602836.jpg"
                      }
                      download={url}
                    />
                  ))}
                </SimpleGrid>
              </Flex>
            </Flex>
            <Flex
              flexDirection="column"
              gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
            >
              <Card px="0px" mb="20px">
                <TableTopCreators data={users} />
              </Card>
            </Flex>
          </Grid>
          {/* Delete Product */}
        </Box>
      ) : (
        <Progress style={{ width: 700 }} isIndeterminate />
      )}
    </>
  );
}

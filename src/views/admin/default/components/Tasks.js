// Chakra imports
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import Menu from "components/menu/MainMenu";
import IconBox from "components/icons/IconBox";

// Assets
import { MdCheckBox, MdDragIndicator } from "react-icons/md";
import React from "react";

export default function Conversion(props) {
  const { ...rest } = props;
  const { tweets } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  const brandColor = useColorModeValue("brand.500", "brand.400");
  return (
    <Card p="20px" align="center" direction="column" w="100%" {...rest}>
      <Flex alignItems="center" w="100%" mb="30px">
        <Text color={textColor} fontSize="lg" fontWeight="700">
          Trending Tweets
        </Text>
      </Flex>
      <Box px="11px">
        {tweets.map(({ name, url }) => (
          <Flex mb="20px">
            <a href={url} target="_blank">
              <Text
                fontWeight="bold"
                color={textColor}
                fontSize="md"
                textAlign="start"
              >
                {name}
              </Text>
            </a>
          </Flex>
        ))}
      </Box>
    </Card>
  );
}

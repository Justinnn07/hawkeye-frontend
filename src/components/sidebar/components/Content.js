// chakra imports
import { Box, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import React from "react";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  let sidebarBackgroundColor = useColorModeValue("#1c83e0", "navy.800");

  // SIDEBAR
  return (
    <Flex
      direction="column"
      height="100%"
      pt="25px"
      bg={sidebarBackgroundColor}
    >
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>

      <Box
        ps="20px"
        pe={{ md: "16px", "2xl": "0px" }}
        mt="60px"
        mb="40px"
        borderRadius="30px"
      ></Box>
    </Flex>
  );
}

export default SidebarContent;

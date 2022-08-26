import { Box, SimpleGrid } from "@chakra-ui/react";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import { columnsDataComplex } from "views/admin/dataTables/variables/columnsData";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

export default function Settings({ data, pathname }) {
  const [show, setShow] = useState("Web Channels");

  if (!data.channel) {
    return <Redirect to="/" />;
  }

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <ComplexTable
          columnsData={columnsDataComplex}
          pathname={pathname}
          setShow={setShow}
          show={show}
          tableData={
            pathname === "/web-channels"
              ? data?.website
              : pathname === "/news-channels"
              ? data?.channel
              : pathname === "/logs" && show === "Web Channels"
              ? data?.website
              : pathname === "/logs" &&
                show === "News Channels" &&
                data?.channel
          }
        />
      </SimpleGrid>
    </Box>
  );
}

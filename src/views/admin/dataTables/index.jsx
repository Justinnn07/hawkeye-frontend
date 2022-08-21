import { Box, SimpleGrid } from "@chakra-ui/react";

import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import { columnsDataComplex } from "views/admin/dataTables/variables/columnsData";
//import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";

import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Settings({ data, pathname }) {
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
          tableData={
            pathname === "/web-channels" ? data?.website : data?.channel
          }
        />
      </SimpleGrid>
    </Box>
  );
}

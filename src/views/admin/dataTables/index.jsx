import { Box, SimpleGrid } from "@chakra-ui/react";

import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import { columnsDataComplex } from "views/admin/dataTables/variables/columnsData";
//import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";

import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Settings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    fetch(
      pathname === "/news-channels"
        ? "https://hawkeye-1.herokuapp.com/channel"
        : "https://hawkeye-1.herokuapp.com/website"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, [pathname]);
  console.log(data);
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
          tableData={data}
          pathname={pathname}
          loading={loading}
        />
      </SimpleGrid>
    </Box>
  );
}

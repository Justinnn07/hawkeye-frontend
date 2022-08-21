import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function ColumnsTable(props) {
  const { columnsData, tableData, type } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, initialState } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="10px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {type === "web" ? "Web Channels" : "News Channels"}
        </Text>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Language</Th>
            <Th>State</Th>
          </Tr>
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {data?.slice(0, 6).map((row, index) => (
            <Tr
              key={index}
              sx={{
                "& > *": {
                  color: "white",
                  fontWeight: "bold",
                },
              }}
            >
              <Td>{row.Name}</Td>
              <Td>{row.Email}</Td>
              <Td>{row.Language}</Td>
              <Td>{row.Location}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Card>
  );
}

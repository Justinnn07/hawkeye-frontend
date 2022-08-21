import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Progress,
  Input,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { Link } from "react-router-dom";
import { useState } from "react";

// Assets
export default function ColumnsTable(props) {
  const { columnsData, tableData, pathname, loading } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [search, setSearch] = useState("");

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 1 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <>
      {loading ? (
        <div>
          <Progress style={{ width: 700 }} isIndeterminate />
        </div>
      ) : (
        <Card w="200%">
          <Flex px="25px" justify="space-between" mb="20px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              {pathname === "/news-channels" ? "News Channels" : "Web Channels"}
            </Text>
            <Input
              placeholder="Search..."
              width="auto"
              borderColor={textColor}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                "&::placeholder": {
                  color: "white",
                },
              }}
            />
          </Flex>

          <Table
            {...getTableProps()}
            variant="simple"
            color="gray.500"
            mb="500px"
          >
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Phone</Th>
                <Th>Email</Th>
                <Th>Language</Th>
                <Th>Social</Th>
                <Th>State</Th>
                <Th>Views</Th>
                <Th>IP</Th>
              </Tr>
            </Thead>

            <Tbody {...getTableBodyProps()}>
              {page
                .filter((res) => {
                  return (
                    res.original.Name.toLowerCase().includes(
                      search.toLowerCase()
                    ) ||
                    res.original.Address.toLowerCase().includes(
                      search.toLowerCase()
                    ) ||
                    res.original.Email.toLowerCase().includes(
                      search.toLowerCase()
                    ) ||
                    res.original.Location.toLowerCase().includes(
                      search.toLowerCase()
                    )
                  );
                })
                .map((row, index) => {
                  console.log(row);

                  return (
                    <Tr
                      key={index}
                      sx={{
                        "& > *": {
                          color: "white",
                          fontWeight: "bold",
                        },
                      }}
                    >
                      <Td>{row.original.Name}</Td>
                      <Td>{row.original.Address}</Td>
                      <Td>{row.original.Phone}</Td>
                      <Td>{row.original.Email}</Td>
                      <Td>{row.original.Location}</Td>
                      <Td>
                        <Flex
                          align="center"
                          sx={{
                            "& > *": {
                              margin: 5,
                            },
                          }}
                        >
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {row.original.Facebook !== "NA" ? (
                              <a
                                href={`${row.original.Facebook}`}
                                target="_blank"
                              >
                                <i class="fa fa-facebook-square"></i>
                              </a>
                            ) : null}
                            &nbsp;
                            {row.original.Instagram !== "NA" ? (
                              <a
                                target="_blank"
                                href={`${row.original.Instagram}`}
                              >
                                <i class="fa fa-instagram"></i>
                              </a>
                            ) : null}
                            {row.original.Twitter !== "NA" ? (
                              <a
                                target="_blank"
                                href={`${row.original.Twitter}`}
                              >
                                <i class="fa fa-twitter"></i>
                              </a>
                            ) : null}
                            {row.original.Youtube !== "NA" ? (
                              <a
                                href={`${row.original.Youtube}`}
                                target="_blank"
                              >
                                <i class="fa fa-youtube-play"></i>
                              </a>
                            ) : null}
                          </Text>
                        </Flex>
                      </Td>
                      <Td>{row.original.Location}</Td>
                      <Td>{row.original.Views}</Td>
                      <Td>{row.original.ip}</Td>
                      {/* {row.original.cells.map((cell, index) => {
                        let data = "";
                        if (cell.column.Header === "NAME") {
                          data = (
                            <a
                              href={
                                row.original.original.Link !== "NA"
                                  ? row.original.Link
                                  : null
                              }
                              target="_blank"
                            >
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {cell.value}
                              </Text>
                            </a>
                          );
                        } else if (cell.column.Header === "ADDRESS") {
                          data = (
                            <Flex align="center">
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "PHONE") {
                          data = (
                            <Flex align="center">
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "EMAIL") {
                          data = (
                            <Flex align="center">
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "LOCATION") {
                          data = (
                            <Flex align="center">
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "SOCIAL") {
                          data = (
                            <Flex
                              align="center"
                              sx={{
                                "& > *": {
                                  margin: 5,
                                },
                              }}
                            >
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {cell.value}
                                {row.Facebook !==
                                "NA" ? (
                                  <a
                                    href={`${row.cells[5]?.row?.original?.Facebook}`}
                                    target="_blank"
                                  >
                                    <i class="fa fa-facebook-square"></i>
                                  </a>
                                ) : null}
                                &nbsp;
                                {row.cells[5]?.row?.original?.Instagram !==
                                "NA" ? (
                                  <a
                                    target="_blank"
                                    href={`${row.cells[5]?.row?.original?.Instagram}`}
                                  >
                                    <i class="fa fa-instagram"></i>
                                  </a>
                                ) : null}
                                {row.cells[5]?.row?.original?.Twitter !==
                                "NA" ? (
                                  <a
                                    target="_blank"
                                    href={`${row.cells[5]?.row?.original?.Twitter}`}
                                  >
                                    <i class="fa fa-twitter"></i>
                                  </a>
                                ) : null}
                                {row.cells[5]?.row?.original?.Youtube !==
                                "NA" ? (
                                  <a
                                    href={`${row.cells[5]?.row?.original?.Youtube}`}
                                    target="_blank"
                                  >
                                    <i class="fa fa-youtube-play"></i>
                                  </a>
                                ) : null}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "VIEWS") {
                          data = (
                            <Flex align="center">
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "LANGUAGE") {
                          data = (
                            <Flex align="center">
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "IP") {
                          data = (
                            <Flex align="center">
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                        }
                        return (
                          <Td
                            {...cell.getCellProps()}
                            key={index}
                            fontSize={{ sm: "14px" }}
                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                            borderColor="transparent"
                          >
                            {data}
                          </Td>
                        );
                      })} */}
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>

          <Flex
            justifyContent="space-between"
            m={4}
            alignItems="center"
            style={{ marginTop: -450 }}
          >
            <Flex>
              <Tooltip label="First Page">
                <IconButton
                  onClick={() => gotoPage(0)}
                  isDisabled={!canPreviousPage}
                  icon={<ArrowLeftIcon h={3} w={3} />}
                  mr={4}
                />
              </Tooltip>
              <Tooltip label="Previous Page">
                <IconButton
                  onClick={previousPage}
                  isDisabled={!canPreviousPage}
                  icon={<ChevronLeftIcon h={6} w={6} />}
                />
              </Tooltip>
            </Flex>

            <Flex alignItems="center">
              <Text flexShrink="0" mr={8}>
                Page{" "}
                <Text fontWeight="bold" as="span">
                  {pageIndex}
                </Text>{" "}
                of{" "}
                <Text fontWeight="bold" as="span">
                  {pageOptions.length}
                </Text>
              </Text>
              <Text flexShrink="0">Go to page:</Text>{" "}
              <NumberInput
                ml={1}
                mr={8}
                w={28}
                min={1}
                max={pageOptions.length}
                onChange={(value) => {
                  const page = value ? value - 1 : 0;
                  gotoPage(page);
                }}
                defaultValue={pageIndex}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Select
                w={32}
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30, 40].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Select>
            </Flex>

            <Flex>
              <Tooltip label="Next Page">
                <IconButton
                  onClick={nextPage}
                  isDisabled={!canNextPage}
                  icon={<ChevronRightIcon h={6} w={6} />}
                />
              </Tooltip>
              <Tooltip label="Last Page">
                <IconButton
                  onClick={() => gotoPage(pageCount - 1)}
                  isDisabled={!canNextPage}
                  icon={<ArrowRightIcon h={3} w={3} />}
                  ml={4}
                />
              </Tooltip>
            </Flex>
          </Flex>
        </Card>
      )}
    </>
  );
}

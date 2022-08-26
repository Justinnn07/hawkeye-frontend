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
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import moment from "moment";

// Assets
export default function ColumnsTable(props) {
  const { columnsData, tableData, pathname, show, setShow } = props;
  const unique = [...new Map(tableData.map((m) => [m.Location, m])).values()];

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [search, setSearch] = useState("");
  const [filterByState, setFilterByState] = useState("all");
  const [filterByHour, setFilterByHour] = useState(0);

  const options = ["Web Channels", "News Channels"];

  console.log(options);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
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
      {data?.length === 0 ? (
        <div>
          <Progress style={{ width: 700 }} isIndeterminate />
        </div>
      ) : (
        <Card w="200%">
          <Flex px="25px" justify="space-between" mb="20px" align="center">
            {pathname === "/logs" ? (
              <Select
                width={200}
                value={show}
                onChange={(e) => setShow(e.target.value)}
              >
                {options.map((res, index) => (
                  <option key={index} value={res}>
                    {res}
                  </option>
                ))}
              </Select>
            ) : (
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
              >
                {pathname === "/news-channels"
                  ? "News Channels"
                  : "Web Channels"}
              </Text>
            )}

            <Flex
              sx={{
                "& > *": {
                  margin: 2,
                },
              }}
            >
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
              {pathname !== "/logs" && (
                <Select
                  w={32}
                  value={filterByState}
                  onChange={(e) => {
                    setFilterByState(e.target.value);
                  }}
                >
                  <option value="all">All</option>
                  {unique.map(({ Location }, index) => (
                    <>
                      {Location === null ? null : (
                        <option key={index} value={Location}>
                          {Location}
                        </option>
                      )}
                    </>
                  ))}
                </Select>
              )}

              {/* {pathname === "/logs" && (
                <Select
                  w={32}
                  value={filterByHour}
                  onChange={(e) => setFilterByHour(Number(e.target.value))}
                >
                  <option value={0}>All</option>
                  <option value={1}>Last 1 Hour</option>
                  <option value={2}>Last 2 Hour</option>
                  <option value={3}>Last 3 Hour</option>
                  <option value={4}>Last 4 Hour</option>
                  <option value={5}>Last 5 Hour</option>
                </Select>
              )} */}
            </Flex>
          </Flex>

          <Table
            // {...getTableProps()}
            variant="simple"
            color="gray.500"
            mb="500px"
          >
            <Thead>
              {pathname === "/web-channels" || pathname === "/news-channels" ? (
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
              ) : (
                <Tr>
                  <Th>Name</Th>
                  <Th>Language</Th>
                  <Th>State</Th>
                  <Th>Views</Th>
                  <Th>Day Registered</Th>
                </Tr>
              )}
            </Thead>

            <Tbody {...getTableBodyProps()}>
              {page.length > 0 &&
                page
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
                      ) ||
                      res.original.ip
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    );
                  })
                  .filter((res) => {
                    return filterByState === "all"
                      ? res
                      : res.original.Location === filterByState;
                  })
                  .map((row, index) => {
                    console.log(row.original);
                    return (
                      <>
                        {pathname === "/logs" ? (
                          <Tr>
                            <Td
                              color={textColor}
                              fontSize="sm"
                              fontWeight="700"
                            >
                              <a
                                href={`http://${row.original.Link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {row.original.Name}
                              </a>
                            </Td>
                            <Td>
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {row.original.Language}
                              </Text>
                            </Td>
                            <Td>
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {row.original.Location}
                              </Text>
                            </Td>
                            <Td>
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {row.original.Views}
                              </Text>
                            </Td>
                            <Td>
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {moment(row.original.timestamp).format(
                                  "MMMM Do YYYY, dddd, h:mm:ss a"
                                )}
                              </Text>
                            </Td>
                          </Tr>
                        ) : (
                          <Tr key={index}>
                            <Td
                              color={textColor}
                              fontSize="sm"
                              fontWeight="700"
                            >
                              <a
                                href={`https://${row.original.Link}`}
                                target="_blank"
                              >
                                {row.original.Name}
                              </a>
                            </Td>
                            <Td
                              color={textColor}
                              fontSize="sm"
                              fontWeight="700"
                            >
                              {row.original.Address}
                            </Td>
                            <Td
                              color={textColor}
                              fontSize="sm"
                              fontWeight="700"
                            >
                              {row.original.Phone}
                            </Td>
                            <Td
                              color={textColor}
                              fontSize="sm"
                              fontWeight="700"
                            >
                              {row.original.Email}
                            </Td>
                            <Td
                              color={textColor}
                              fontSize="sm"
                              fontWeight="700"
                            >
                              {row.original.Location}
                            </Td>
                            <Td>
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                <Flex justifyContent="space-between">
                                  {row.original.Facebook !== null ? (
                                    <a
                                      href={`${row.original.Facebook}`}
                                      target="_blank"
                                    >
                                      <BsFacebook fontSize={20} />
                                    </a>
                                  ) : null}
                                  {row.original.Instagram !== null ? (
                                    <a
                                      target="_blank"
                                      href={`${row.original.Instagram}`}
                                    >
                                      <BsInstagram fontSize={20} />
                                    </a>
                                  ) : null}
                                  {row.original.Twitter !== null ? (
                                    <a
                                      target="_blank"
                                      href={`${row.original.Twitter}`}
                                    >
                                      <BsTwitter fontSize={20} />
                                    </a>
                                  ) : null}
                                  {row.original.Youtube !== null ? (
                                    <a
                                      href={`${row.original.Youtube}`}
                                      target="_blank"
                                    >
                                      <BsYoutube fontSize={20} />
                                    </a>
                                  ) : null}
                                </Flex>
                              </Text>
                            </Td>
                            <Td
                              color={textColor}
                              fontSize="sm"
                              fontWeight="700"
                            >
                              {row.original.Location}
                            </Td>
                            <Td
                              color={textColor}
                              fontSize="sm"
                              fontWeight="700"
                            >
                              {row.original.Views}
                            </Td>
                            <Td
                              color={textColor}
                              fontSize="sm"
                              fontWeight="700"
                            >
                              {row.original.ip}
                            </Td>
                          </Tr>
                        )}
                      </>
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
                  {pageIndex + 1}
                </Text>{" "}
                of{" "}
                <Text fontWeight="bold" as="span">
                  {pageOptions.length}
                </Text>
              </Text>
              <Text flexShrink="0">Go to page:</Text>
              <Select
                w={32}
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 15, 20, 25].map((pageSize) => (
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

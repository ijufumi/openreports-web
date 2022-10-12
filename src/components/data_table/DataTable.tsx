import React, { FC, useState, useMemo } from "react";
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  Icon,
  IconButton,
  Tooltip,
  Select,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import {
  BsChevronDoubleRight,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronLeft,
} from "react-icons/bs";

interface Props {
  columns: Array<ColumnDef<any>>;
  pageSizes: Array<number>;
  defaultPageSize: number;
  data: Array<any>;
  totalCount: number;
}

const DataTable: FC<Props> = ({
  columns,
  pageSizes,
  defaultPageSize,
  data,
  totalCount,
}) => {
  const [pageState, setPageState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const pagination = useMemo(
    () => ({
      pageIndex: pageState.pageIndex,
      pageSize: pageState.pageSize,
    }),
    [pageState]
  );

  const pageCount = useMemo(() => {
    let count = totalCount / pageState.pageSize;
    if (totalCount % pageState.pageSize !== 0) {
      count += 1;
    }
    return count;
  }, [totalCount, pageState]);

  const fixedData = useMemo(() => {
    if (data.length >= pageState.pageSize) {
      return data;
    }
    const modifiedData = Object.assign([], data);
    for (let i = 0; i < pageState.pageSize - data.length; i++) {
      modifiedData.push({});
    }
    return modifiedData;
  }, [data]);

  const table = useReactTable({
    data: fixedData,
    columns,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPageState,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
  });

  const handleChangePageSize = (pageSize: number) => {
    setPageState(Object.assign({ pageSize: pageSize }, pageState));
  };

  const handleChangePage = (page: number) => {
    setPageState(Object.assign({ pageIndex: page }, pageState));
  };

  const handlePreviousPage = () => {
    handleChangePage(pageState.pageIndex - 1);
  };

  const handleNextPage = () => {
    handleChangePage(pageState.pageIndex + 1);
  };

  return (
    <Box sx={{ bgColor: "#FFFFFF", width: "100%", borderRadius: "6px" }}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id} width={cell.column.columnDef.size}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex>
            <Tooltip label="First Page">
              <IconButton
                onClick={() => handleChangePage(0)}
                //isDisabled={!canPreviousPage}
                icon={<Icon as={BsChevronDoubleLeft} />}
                aria-label={"previous page"}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                onClick={handlePreviousPage}
                //isDisabled={!canPreviousPage}
                icon={<Icon as={BsChevronLeft} />}
                aria-label={"previous page"}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page{" "}
              <Text fontWeight="bold" as="span">
                {pageState.pageIndex + 1}
              </Text>{" "}
              of{" "}
              <Text fontWeight="bold" as="span">
                {pageSizes.length}
              </Text>
            </Text>
            <Text flexShrink="0">Go to page:</Text>{" "}
            <NumberInput
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={pageSizes.length}
              onChange={(value) => {
                const page = value ? parseInt(value, 10) - 1 : 0;
                handleChangePage(page);
              }}
              defaultValue={pageState.pageIndex + 1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              w={32}
              value={pageState.pageSize}
              onChange={(e) => {
                handleChangePageSize(Number(e.target.value));
              }}
            >
              {pageSizes.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex>
            <Tooltip label="Next Page">
              <IconButton
                onClick={handleNextPage}
                //isDisabled={!canNextPage}
                icon={<Icon as={BsChevronRight} />}
                aria-label={"next page"}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                onClick={() => handleChangePage(pageCount - 1)}
                //isDisabled={!canNextPage}
                icon={<Icon as={BsChevronDoubleRight} />}
                aria-label={"next page"}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </TableContainer>
    </Box>
  );
};

export default DataTable;

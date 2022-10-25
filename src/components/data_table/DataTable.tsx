import React, { FC, useState, useMemo, useEffect } from "react";
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

type OnChangeType = (pageIndex: number, pageSize: number) => void;

interface Props {
  columns: Array<ColumnDef<any>>;
  pageSizes?: Array<number>;
  defaultPageSize?: number;
  data: Array<any>;
  totalCount: number;
  onChange: OnChangeType;
}

const DataTable: FC<Props> = ({
  columns,
  pageSizes = [10, 20, 30],
  defaultPageSize = 10,
  data,
  totalCount,
  onChange,
}) => {
  const [initialized, setInitialized] = useState<boolean>(false);
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
    return Math.ceil(totalCount / pageState.pageSize);
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
  }, [data, pageState]);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      return;
    }
    onChange(pageState.pageIndex, pageState.pageSize);
  }, [pageState]);

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
    debugTable: true,
  });

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
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                icon={<Icon as={BsChevronDoubleLeft} />}
                aria-label={"previous page"}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                icon={<Icon as={BsChevronLeft} />}
                aria-label={"previous page"}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page{" "}
              <Text fontWeight="bold" as="span">
                {table.getState().pagination.pageIndex + 1}
              </Text>{" "}
              of{" "}
              <Text fontWeight="bold" as="span">
                {table.getPageCount()}
              </Text>
            </Text>
            <Text flexShrink="0">Go to page:</Text>{" "}
            <NumberInput
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={table.getPageCount()}
              onChange={(value) => {
                const page = value ? parseInt(value, 10) - 1 : 0;
                table.setPageIndex(page);
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
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
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
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                icon={<Icon as={BsChevronRight} />}
                aria-label={"next page"}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
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

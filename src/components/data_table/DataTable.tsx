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
} from "@chakra-ui/react";

interface Props {
  columns: Array<ColumnDef<any>>;
  pageSizes: Array<number>;
  defaultPageSize: number;
  data: Array<any>;
  pageCount: number;
}

const DataTable: FC<Props> = ({
  columns,
  pageSizes,
  defaultPageSize,
  data,
  pageCount,
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

  return (
    <Box sx={{ bgColor: "#FFFFFF", width: "100%" }}>
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
                      <Td key={cell.id}>
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
      </TableContainer>
    </Box>
  );
};

export default DataTable;

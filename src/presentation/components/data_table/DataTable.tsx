import React, { FC, useState, useMemo, useEffect } from "react"
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table"
import {
  Table,
  Box,
  Flex,
  Icon,
  IconButton,
  NativeSelect,
  Text,
  NumberInput,
} from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/tooltip"

import {
  BsChevronDoubleRight,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronLeft,
} from "react-icons/bs"

import { HEADER_HEIGHT, ACTIONS_HEIGHT } from "../../pages/consts"

const PAGER_HEIGHT = 70

const SPACE_HEIGHT = HEADER_HEIGHT + ACTIONS_HEIGHT + PAGER_HEIGHT + 30

type OnChangeType = (pageIndex: number, pageSize: number) => void

interface Props {
  columns: Array<ColumnDef<any>>
  pageSizes?: Array<number>
  defaultPageSize?: number
  data: Array<any>
  totalCount: number
  onChange: OnChangeType
}

const DataTable: FC<Props> = ({
  columns,
  pageSizes = [10, 20, 30],
  defaultPageSize = 10,
  data,
  totalCount,
  onChange,
}) => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [pageState, setPageState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  })

  const pagination = useMemo(
    () => ({
      pageIndex: pageState.pageIndex,
      pageSize: pageState.pageSize,
    }),
    [pageState]
  )

  const pageCount = useMemo(() => {
    return Math.ceil(totalCount / pageState.pageSize)
  }, [totalCount, pageState])

  const fixedData = useMemo(() => {
    if (data.length >= pageState.pageSize) {
      return data
    }
    const modifiedData = Object.assign([], data)
    for (let i = 0; i < pageState.pageSize - data.length; i++) {
      modifiedData.push({})
    }
    return modifiedData
  }, [data, pageState])

  useEffect(() => {
    if (!initialized) {
      setInitialized(true)
      return
    }
    onChange(pageState.pageIndex, pageState.pageSize)
  }, [pageState])

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
  })

  return (
    <Box css={{ bgColor: "#FFFFFF", width: "100%", borderRadius: "6px" }}>
      <Table.ScrollArea>
        <Box
          css={{
            maxHeight: `calc(100vh - ${SPACE_HEIGHT}px)`,
            overflowY: "auto",
          }}
        >
          <Table.Root variant="line">
            <Table.Header>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Row key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Table.ColumnHeader
                        key={header.id}
                        colSpan={header.colSpan}
                        css={{ position: "sticky", top: 0, zIndex: 10 }}
                        bg="gray.300"
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </Table.ColumnHeader>
                    )
                  })}
                </Table.Row>
              ))}
            </Table.Header>
            <Table.Body>
              {table.getRowModel().rows.map((row) => {
                return (
                  <Table.Row key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Table.Cell key={cell.id} width={cell.column.columnDef.size}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Table.Cell>
                      )
                    })}
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Root>
        </Box>
        {totalCount > 0 && (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            height={PAGER_HEIGHT}
          >
            <Flex>
              <Tooltip content="First Page">
                <IconButton
                  variant={"pager" as any}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  aria-label={"previous page"}
                  mr={4}
                >
                  <Icon as={BsChevronDoubleLeft} />
                </IconButton>
              </Tooltip>
              <Tooltip content="Previous Page">
                <IconButton
                  variant={"pager" as any}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label={"previous page"}
                >
                  <Icon as={BsChevronLeft} />
                </IconButton>
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
              <NumberInput.Root
                size="sm"
                value={(table.getState().pagination.pageIndex + 1).toString()}
                onValueChange={(details) =>
                  table.setPageIndex(Math.min(Math.max(Number(details.value) - 1, 0), table.getPageCount() - 1))
                }
                min={1}
                max={table.getPageCount()}
                w="80px"
              >
                <NumberInput.Input />
                <NumberInput.Control>
                  <NumberInput.IncrementTrigger />
                  <NumberInput.DecrementTrigger />
                </NumberInput.Control>
              </NumberInput.Root>
              <NativeSelect.Root w={32}>
                <NativeSelect.Field
                  value={table.getState().pagination.pageSize.toString()}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                >
                  {pageSizes.map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Flex>

            <Flex>
              <Tooltip content="Next Page">
                <IconButton
                  variant={"pager" as any}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label={"next page"}
                >
                  <Icon as={BsChevronRight} />
                </IconButton>
              </Tooltip>
              <Tooltip content="Last Page">
                <IconButton
                  variant={"pager" as any}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  aria-label={"next page"}
                  ml={4}
                >
                  <Icon as={BsChevronDoubleRight} />
                </IconButton>
              </Tooltip>
            </Flex>
          </Flex>
        )}
      </Table.ScrollArea>
    </Box>
  )
}

export default DataTable

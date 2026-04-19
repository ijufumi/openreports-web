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

const PAGER_HEIGHT = 56

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
    <Box
      w="100%"
      bg="transparent"
      borderTopWidth="1px"
      borderColor="nothing.text"
    >
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
                        bg="nothing.bg"
                        fontFamily="mono"
                        fontWeight={400}
                        fontSize="10px"
                        letterSpacing="0.2em"
                        textTransform="uppercase"
                        color="nothing.textSecondary"
                        borderBottomWidth="1px"
                        borderColor="nothing.border"
                        py="12px"
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
                  <Table.Row
                    key={row.id}
                    transition="background 120ms ease-out"
                    _hover={{ bg: "nothing.subtle" }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Table.Cell
                          key={cell.id}
                          width={cell.column.columnDef.size}
                          fontFamily="body"
                          fontSize="14px"
                          color="nothing.text"
                          borderBottomWidth="1px"
                          borderColor="nothing.border"
                          py="16px"
                        >
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
            pt="16px"
          >
            <Flex gap="8px">
              <Tooltip content="First Page">
                <IconButton
                  variant={"pager" as any}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="first page"
                >
                  <Icon as={BsChevronDoubleLeft} />
                </IconButton>
              </Tooltip>
              <Tooltip content="Previous Page">
                <IconButton
                  variant={"pager" as any}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="previous page"
                >
                  <Icon as={BsChevronLeft} />
                </IconButton>
              </Tooltip>
            </Flex>

            <Flex alignItems="center" gap="24px">
              <Text
                fontFamily="mono"
                fontSize="11px"
                letterSpacing="0.15em"
                textTransform="uppercase"
                color="nothing.textSecondary"
              >
                Page{" "}
                <Text as="span" color="nothing.text">
                  {String(table.getState().pagination.pageIndex + 1).padStart(
                    2,
                    "0"
                  )}
                </Text>
                {" / "}
                <Text as="span" color="nothing.text">
                  {String(table.getPageCount()).padStart(2, "0")}
                </Text>
              </Text>
              <Flex alignItems="center" gap="8px">
                <Text
                  fontFamily="mono"
                  fontSize="10px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="nothing.textSecondary"
                >
                  Go
                </Text>
                <NumberInput.Root
                  size="sm"
                  value={(table.getState().pagination.pageIndex + 1).toString()}
                  onValueChange={(details) =>
                    table.setPageIndex(
                      Math.min(
                        Math.max(Number(details.value) - 1, 0),
                        table.getPageCount() - 1
                      )
                    )
                  }
                  min={1}
                  max={table.getPageCount()}
                  w="72px"
                >
                  <NumberInput.Input
                    fontFamily="mono"
                    fontSize="13px"
                    borderColor="nothing.border"
                    _focus={{ borderColor: "nothing.text" }}
                  />
                  <NumberInput.Control>
                    <NumberInput.IncrementTrigger />
                    <NumberInput.DecrementTrigger />
                  </NumberInput.Control>
                </NumberInput.Root>
              </Flex>
              <NativeSelect.Root w="112px" variant="outline">
                <NativeSelect.Field
                  value={table.getState().pagination.pageSize.toString()}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                  fontFamily="mono"
                  fontSize="11px"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  borderColor="nothing.border"
                >
                  {pageSizes.map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Flex>

            <Flex gap="8px">
              <Tooltip content="Next Page">
                <IconButton
                  variant={"pager" as any}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="next page"
                >
                  <Icon as={BsChevronRight} />
                </IconButton>
              </Tooltip>
              <Tooltip content="Last Page">
                <IconButton
                  variant={"pager" as any}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  aria-label="last page"
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

import React, { FC, useEffect, useState } from "react"
import {
  Button,
  Flex,
  Icon,
  IconButton,
  Link,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/tooltip"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import DataTable from "../../components/data_table/DataTable"
import { setBreadcrumbs } from "../../../infrastructure/state/Breadcrumbs"
import { GrTrash } from "react-icons/gr"
import useNavigator from "../navigator"
import DataSourceVo from "../../../application/dto/vos/responses/DataSourceVo"
import DataSourcesVo from "../../../application/dto/vos/responses/DataSourcesVo"
import UseCaseFactory from "../../../di/UseCaseFactory"
import { successToast, errorToast } from "../../../infrastructure/state/Toast"
import { useLocation } from "react-router"

interface Props {}

const DataSources: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [dataSources, setDataSources] = useState<DataSourcesVo | undefined>(
    undefined
  )
  const navigator = useNavigator()
  const { state } = useLocation()

  const dataSourceUseCase = UseCaseFactory.createDataSourceUseCase()

  useEffect(() => {
    const initialize = async () => {
      const _dataSources = await dataSourceUseCase.gets({ page: 0, limit: 10 })
      if (_dataSources) {
        setDataSources(_dataSources)
      }
      setInitialized(true)
      setBreadcrumbs([
        {
          title: "DataSources",
        },
      ])
    }
    initialize()
  }, [state])

  const handleOnChange = async (page: number, limit: number) => {
    const _dataSources = await dataSourceUseCase.gets({ page, limit })
    if (_dataSources) {
      setDataSources(_dataSources)
    }
  }

  const handleDelete = async (id: string) => {
    const result = await dataSourceUseCase.delete({ id })
    if (result) {
      successToast({
        title: "Delete succeeded.",
        description: "You've finished deleting data source.",
      })
    } else {
      errorToast({
        title: "Delete failed.",
        description: "You've failed deleting data source.",
      })
    }
  }

  const handleClick = (id: string) => {
    navigator.toDataSourceEdit(id)
  }

  const handleClickNew = () => {
    navigator.toDataSourceNew()
  }

  if (!initialized) {
    return null
  }

  const columnHelper = createColumnHelper<DataSourceVo>()

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (props) => {
        if (!props.getValue()) {
          return ""
        }
        return (
          <Link onClick={() => handleClick(props.getValue())}>
            {props.getValue()}
          </Link>
        )
      },
      size: 100,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("driverTypeName", {
      header: "Driver Type",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("formattedCreatedAt", {
      header: "Created at",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("formattedUpdatedAt", {
      header: "Updated at",
      cell: (props) => props.getValue(),
    }),
    columnHelper.display({
      header: "Actions",
      cell: (props) => {
        const reportId = props.row.getValue("id") as string
        if (!reportId) {
          return undefined
        }
        return (
          <Wrap gap={5}>
            <WrapItem>
              <Tooltip content="Delete report">
                <IconButton
                  variant={"actionIcons" as any}
                  aria-label="output"
                  onClick={() => handleDelete(reportId)}
                >
                  <Icon as={GrTrash} />
                </IconButton>
              </Tooltip>
            </WrapItem>
          </Wrap>
        )
      },
    }),
  ] as ColumnDef<DataSourceVo>[]

  return (
    <VStack>
      <Flex w="100%" justifyContent="flex-end">
        <Button onClick={handleClickNew} variant={"action" as any}>
          Create
        </Button>
      </Flex>
      <DataTable
        columns={columns}
        data={dataSources?.items || []}
        totalCount={!!dataSources?.count ? dataSources.count : 0}
        onChange={handleOnChange}
      />
    </VStack>
  )
}

export default DataSources

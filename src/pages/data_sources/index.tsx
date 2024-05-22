import React, { FC, useEffect, useState } from "react"
import {
  Button,
  Flex,
  Icon,
  IconButton,
  Link,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import DataTable from "../../components/data_table/DataTable"
import { setBreadcrumbs } from "../../states/Breadcrumbs"
import { GrTrash } from "react-icons/gr"
import useNavigator from "../navigator"
import DataSourceVo from "src/vos/DataSourceVo"
import DataSourcesVo from "src/vos/DataSourcesVo"
import UseCaseFactory from "../../use_cases/UseCaseFactory"
import { successToast, errorToast } from "../../states/Toast"

interface Props {}

const DataSources: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [dataSources, setDataSources] = useState<DataSourcesVo | undefined>(
    undefined
  )
  const navigator = useNavigator()

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
  }, [])

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
    navigator.toReportEdit(id)
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
          <Wrap spacing={5}>
            <WrapItem>
              <Tooltip label="Delete report">
                <IconButton
                  icon={<Icon as={GrTrash} />}
                  variant="actionIcons"
                  aria-label="output"
                  onClick={() => handleDelete(reportId)}
                />
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
        <Button onClick={handleClickNew} variant="action">
          Create
        </Button>
      </Flex>
      <DataTable
        columns={columns}
        data={dataSources?.items || []}
        totalCount={dataSources?.count || 0}
        onChange={handleOnChange}
      />
    </VStack>
  )
}

export default DataSources

import React, { FC, useState, useEffect } from "react"
import { useLocation } from "react-router"
import {
  VStack,
  Link,
  Wrap,
  WrapItem,
  Icon,
  IconButton,
  Flex,
  Button,
} from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/tooltip"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { GrDocumentPdf, GrTrash } from "react-icons/gr"
import UseCaseFactory from "../../../di/UseCaseFactory"
import ReportsVo from "../../../application/dto/vos/responses/ReportsVo"
import ReportVo from "../../../application/dto/vos/responses/ReportVo"
import DataTable from "../../components/data_table/DataTable"
import { setBreadcrumbs } from "../../../infrastructure/state/Breadcrumbs"
import DownloadUtils from "../../../infrastructure/utils/download/DownloadUtils"
import DateUtils from "../../../infrastructure/utils/date/DateUtils"
import useNavigator from "../navigator"
import { successToast, errorToast } from "../../../infrastructure/state/Toast"
import { ACTIONS_HEIGHT } from "../consts"

interface Props {}

const Reports: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [reports, setReports] = useState<ReportsVo | undefined>(undefined)

  const navigator = useNavigator()
  const { state } = useLocation()
  const reportsUseCase = UseCaseFactory.createReportsUseCase()

  useEffect(() => {
    const initialize = async () => {
      const reports = await reportsUseCase.reports({ page: 0, limit: 10 })
      if (reports !== undefined) {
        setReports(reports)
      }
      setInitialized(true)
      setBreadcrumbs([
        {
          title: "Reports",
        },
      ])
    }
    initialize()
  }, [state])

  const handleOnChange = async (page: number, limit: number) => {
    const reports = await reportsUseCase.reports({ page, limit })
    if (reports !== undefined) {
      setReports(reports)
    }
  }

  const handleOutput = async (id: string, asPDF: boolean = false) => {
    const data = await reportsUseCase.outputReport({ id, asPDF })
    if (data) {
      DownloadUtils.download(data.blob, data.filename)
    } else {
      errorToast({
        title: "Edit didn't output.",
        description: "You couldn't output the report because of errors.",
      })
    }
  }

  const handleDelete = async (id: string) => {
    await reportsUseCase.deleteReport({ id })
  }

  const handleClick = (id: string) => {
    navigator.toReportEdit(id)
  }

  const handleClickNew = () => {
    navigator.toReportNew()
  }

  if (!initialized) {
    return null
  }

  const columnHelper = createColumnHelper<ReportVo>()

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
    columnHelper.accessor("templateName", {
      header: "TemplateVo name",
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
              <Tooltip content="Output report">
                <IconButton
                  variant={"actionIcons" as any}
                  aria-label="output"
                  onClick={() => handleOutput(reportId, true)}
                >
                  <Icon as={GrDocumentPdf} />
                </IconButton>
              </Tooltip>
            </WrapItem>
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
  ] as ColumnDef<ReportVo>[]

  return (
    <VStack gap={6} align="stretch">
      <Flex
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
        justifyContent="space-between"
        alignItems="center"
      >
        <VStack align="start" gap={1}>
          <Flex fontSize="2xl" fontWeight="bold" color="gray.800">
            Reports
          </Flex>
          <Flex fontSize="sm" color="gray.600">
            View, manage, and export your reports
          </Flex>
        </VStack>
        <Button
          onClick={handleClickNew}
          colorScheme="blue"
          size="lg"
          boxShadow="sm"
        >
          Create New
        </Button>
      </Flex>
      <DataTable
        columns={columns}
        data={reports?.items || []}
        totalCount={!!reports?.count ? reports.count : 0}
        onChange={handleOnChange}
      />
    </VStack>
  )
}

export default Reports

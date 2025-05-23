import React, { FC, useEffect, useState } from "react"
import { useParams } from "react-router"
import {
  HStack,
  Box,
  Grid,
  GridItem,
  Text,
  Input,
  Select,
  Button,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import ReportVo from "../../../vos/responses/ReportVo"
import UseCaseFactory from "../../../usecases/UseCaseFactory"
import { setBreadcrumbs } from "../../../states/Breadcrumbs"
import TemplateVo from "../../../vos/responses/TemplateVo"
import useNavigator from "../../navigator"
import { successToast, errorToast } from "../../../states/Toast"

interface Props {}

const ReportEdit: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [report, setReport] = useState<ReportVo | undefined>(undefined)
  const [templates, setTemplates] = useState<TemplateVo[]>([])
  const [name, setName] = useState<string>("")
  const [templateId, setTemplateId] = useState<string>("")

  const params = useParams()
  const navigator = useNavigator()
  const id = !!params.id ? params.id : ""

  const reportsUseCase = UseCaseFactory.createReportsUseCase()

  useEffect(() => {
    const initialize = async () => {
      if (id) {
        const _report = await reportsUseCase.report({ id })
        setReport(_report)
      }
      const reportTemplatesVo = await reportsUseCase.templates({
        page: 0,
        limit: -1,
      })
      if (reportTemplatesVo) {
        setTemplates(reportTemplatesVo.items)
      }
      setBreadcrumbs([
        {
          func: navigator.toReports,
          title: "Reports",
        },
        {
          title: id,
        },
      ])
      setInitialized(true)
    }
    initialize()
  }, [id])

  useEffect(() => {
    if (report) {
      setName(report.name)
      setTemplateId(report.templateId)
    }
  }, [report])

  const handleUpdate = async () => {
    const _report = await reportsUseCase.updateReport({ id, name, templateId })
    if (_report) {
      setReport(_report)
      successToast({
        title: "Edit updated.",
        description: "You've finished updating report well.",
      })
    } else {
      errorToast({
        title: "Edit didn't updated.",
        description: "You couldn't update report because of errors.",
      })
    }
  }

  const handleCancel = () => {
    navigator.toReports()
  }

  if (!initialized) {
    return null
  }

  if (!report) {
    navigator.toNotfoundError()
    return null
  }

  return (
    <HStack>
      <Box
        sx={{ borderRadius: "10px", borderColor: "gray.50", bgColor: "white" }}
        p={5}
        w="50%"
      >
        <Grid templateColumns="repeat(5, 1fr)" gap={0}>
          <GridItem colSpan={2} h={50} p={5} display="flex" alignItems="center">
            <Text fontWeight={600}>ID</Text>
          </GridItem>
          <GridItem colSpan={3} h={50} display="flex" alignItems="center">
            <Text>{report.id}</Text>
          </GridItem>
          <GridItem
            colSpan={2}
            h={50}
            p={5}
            display="flex"
            alignItems="center"
            bgColor="gray.50"
          >
            <Text fontWeight={600}>Name</Text>
          </GridItem>
          <GridItem
            colSpan={3}
            h={50}
            display="flex"
            alignItems="center"
            bgColor="gray.50"
          >
            <Input
              variant="flushed"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={2} h={50} p={5} display="flex" alignItems="center">
            <Text fontWeight={600}>Template name</Text>
          </GridItem>
          <GridItem colSpan={3} h={50} display="flex" alignItems="center">
            <Select
              onChange={(e) => setTemplateId(e.target.value)}
              value={templateId}
            >
              {templates.map((template) => {
                return (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                )
              })}
            </Select>
          </GridItem>
          <GridItem
            colSpan={2}
            h={50}
            p={5}
            display="flex"
            alignItems="center"
            bgColor="gray.50"
          >
            <Text fontWeight={600}>Created at</Text>
          </GridItem>
          <GridItem
            colSpan={3}
            h={50}
            display="flex"
            alignItems="center"
            bgColor="gray.50"
          >
            <Text>{report.formattedCreatedAt}</Text>
          </GridItem>
          <GridItem colSpan={2} h={50} p={5} display="flex" alignItems="center">
            <Text fontWeight={600}>Updated at</Text>
          </GridItem>
          <GridItem colSpan={3} h={50} display="flex" alignItems="center">
            <Text>{report.formattedUpdatedAt}</Text>
          </GridItem>
        </Grid>
        <Box mt={1} display="flex" justifyContent="flex-end">
          <Wrap spacingX={2}>
            <WrapItem>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            </WrapItem>
            <WrapItem>
              <Button onClick={handleUpdate}>Update</Button>
            </WrapItem>
          </Wrap>
        </Box>
      </Box>
    </HStack>
  )
}

export default ReportEdit

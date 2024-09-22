import React, { FC, useEffect, useState } from "react"
import {
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
import UseCaseFactory from "../../use_cases/UseCaseFactory"
import { setBreadcrumbs } from "../../states/Breadcrumbs"
import TemplateVo from "../../vos/responses/TemplateVo"
import useNavigator from "../navigator"
import { successToast, errorToast } from "../../states/Toast"

interface Props {}

const ReportNew: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [reportTemplates, setReportTemplates] = useState<TemplateVo[]>([])
  const [name, setName] = useState<string>("")
  const [templateId, setTemplateId] = useState<string>("")

  const navigator = useNavigator()
  const id = ""

  const reportsUseCase = UseCaseFactory.createReportsUseCase()

  useEffect(() => {
    const initialize = async () => {
      const reportTemplatesVo = await reportsUseCase.templates({
        page: 0,
        limit: -1,
      })
      if (reportTemplatesVo) {
        setReportTemplates(reportTemplatesVo.items)
      }
      setBreadcrumbs([
        {
          func: navigator.toReports,
          title: "Reports",
        },
        {
          title: "new",
        },
      ])
      setInitialized(true)
    }
    initialize()
  }, [id])

  const handleUpdate = async () => {
    const _report = await reportsUseCase.updateReport({
      id,
      name,
      templateId,
    })
    if (_report) {
      successToast({
        title: "Creation succeeded.",
        description: "You've finished updating report well.",
      })
    } else {
      errorToast({
        title: "Creation failed.",
        description: "You couldn't create report because of errors.",
      })
    }
  }

  const handleCancel = () => {
    navigator.toReports()
  }

  if (!initialized) {
    return null
  }

  return (
    <Box
      sx={{ borderRadius: "10px", borderColor: "gray.100", bgColor: "white" }}
      p={5}
      w="50%"
    >
      <Grid templateColumns="repeat(5, 1fr)" gap={0}>
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
            {reportTemplates.map((template) => {
              return (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              )
            })}
          </Select>
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
  )
}

export default ReportNew

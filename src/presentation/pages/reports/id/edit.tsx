import React, { FC, useEffect, useState } from "react"
import { useParams } from "react-router"
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  NativeSelect,
  Button,
  Field,
  Grid,
} from "@chakra-ui/react"
import ReportVo from "../../../../application/dto/vos/responses/ReportVo"
import UseCaseFactory from "../../../../di/UseCaseFactory"
import { setBreadcrumbs } from "../../../../infrastructure/state/Breadcrumbs"
import TemplateVo from "../../../../application/dto/vos/responses/TemplateVo"
import useNavigator from "../../navigator"
import { successToast, errorToast } from "../../../../infrastructure/state/Toast"

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
        { func: navigator.toReports, title: "Reports" },
        { title: id },
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
    <VStack gap="48px" align="stretch" maxW="720px">
      <Box>
        <Text
          fontFamily="mono"
          fontSize="10px"
          letterSpacing="0.25em"
          textTransform="uppercase"
          color="nothing.textSecondary"
          mb="8px"
        >
          [Reports / Edit]
        </Text>
        <Text
          fontFamily="heading"
          fontSize="56px"
          lineHeight="1"
          letterSpacing="-0.03em"
          fontWeight={500}
          color="nothing.text"
        >
          {report.name || "Untitled"}
        </Text>
        <Text
          mt="12px"
          fontFamily="mono"
          fontSize="12px"
          color="nothing.textDisabled"
        >
          {report.id}
        </Text>
      </Box>

      <VStack
        gap="32px"
        align="stretch"
        borderTopWidth="1px"
        borderColor="nothing.text"
        pt="32px"
      >
        <Field.Root>
          <Field.Label
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="nothing.textSecondary"
            mb="8px"
          >
            Name
          </Field.Label>
          <Input
            variant="flushed"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fontSize="17px"
            px={0}
            borderColor="nothing.border"
            _focus={{ borderColor: "nothing.text" }}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="nothing.textSecondary"
            mb="8px"
          >
            Template
          </Field.Label>
          <NativeSelect.Root variant="plain">
            <NativeSelect.Field
              onChange={(e) => setTemplateId(e.target.value)}
              value={templateId}
              fontSize="17px"
              px={0}
              borderBottomWidth="1px"
              borderColor="nothing.border"
              borderRadius={0}
              _focus={{ borderColor: "nothing.text" }}
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator color="nothing.textSecondary" />
          </NativeSelect.Root>
        </Field.Root>

        <Grid templateColumns="1fr 1fr" gap="24px" pt="16px">
          <Box>
            <Text
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="nothing.textSecondary"
              mb="6px"
            >
              Created
            </Text>
            <Text fontFamily="mono" fontSize="13px" color="nothing.text">
              {report.formattedCreatedAt}
            </Text>
          </Box>
          <Box>
            <Text
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="nothing.textSecondary"
              mb="6px"
            >
              Updated
            </Text>
            <Text fontFamily="mono" fontSize="13px" color="nothing.text">
              {report.formattedUpdatedAt}
            </Text>
          </Box>
        </Grid>
      </VStack>

      <HStack justifyContent="flex-end" gap="12px" pt="24px">
        <Button
          variant="outline"
          onClick={handleCancel}
          h="44px"
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.2em"
          textTransform="uppercase"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          h="44px"
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.2em"
          textTransform="uppercase"
        >
          Update →
        </Button>
      </HStack>
    </VStack>
  )
}

export default ReportEdit

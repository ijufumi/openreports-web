import React, { FC, useEffect, useState } from "react"
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  NativeSelect,
  Button,
  Field,
} from "@chakra-ui/react"
import UseCaseFactory from "../../../di/UseCaseFactory"
import { setBreadcrumbs } from "../../../infrastructure/state/Breadcrumbs"
import TemplateVo from "../../../application/dto/vos/responses/TemplateVo"
import useNavigator from "../navigator"
import { successToast, errorToast } from "../../../infrastructure/state/Toast"

interface Props {}

const ReportNew: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [reportTemplates, setReportTemplates] = useState<TemplateVo[]>([])
  const [name, setName] = useState<string>("")
  const [templateId, setTemplateId] = useState<string>("")

  const navigator = useNavigator()
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
        { func: navigator.toReports, title: "Reports" },
        { title: "New" },
      ])
      setInitialized(true)
    }
    initialize()
  }, [])

  const handleCreate = async () => {
    const _report = await reportsUseCase.registerReport({ name, templateId })
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
          [Reports / New]
        </Text>
        <Text
          fontFamily="heading"
          fontSize="56px"
          lineHeight="1"
          letterSpacing="-0.03em"
          fontWeight={500}
          color="nothing.text"
        >
          New report.
        </Text>
      </Box>

      <VStack gap="32px" align="stretch" borderTopWidth="1px" borderColor="nothing.text" pt="32px">
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
            placeholder="Untitled report"
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
              <option value="">Select template…</option>
              {reportTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator color="nothing.textSecondary" />
          </NativeSelect.Root>
        </Field.Root>
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
          onClick={handleCreate}
          h="44px"
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.2em"
          textTransform="uppercase"
        >
          Create →
        </Button>
      </HStack>
    </VStack>
  )
}

export default ReportNew

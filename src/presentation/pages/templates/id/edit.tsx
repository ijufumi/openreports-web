import React, { FC, useState, useEffect } from "react"
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Field,
} from "@chakra-ui/react"
import { useParams } from "react-router"
import useNavigator from "../../navigator"
import UseCaseFactory from "../../../../di/UseCaseFactory"
import { setBreadcrumbs } from "../../../../infrastructure/state/Breadcrumbs"
import { successToast, errorToast } from "../../../../infrastructure/state/Toast"

interface Props {}

const TemplateEdit: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [name, setName] = useState<string>("")

  const params = useParams()
  const navigator = useNavigator()
  const reportsUseCase = UseCaseFactory.createReportsUseCase()

  const id = !!params.id ? params.id : ""

  useEffect(() => {
    const initialize = async () => {
      if (id) {
        const _template = await reportsUseCase.template({ id })
        if (_template) {
          setName(_template.name)
        } else {
          navigator.toNotfoundError()
          return
        }
      }
      setBreadcrumbs([
        { func: navigator.toTemplates, title: "Templates" },
        { title: id },
      ])
      setInitialized(true)
    }
    initialize()
  }, [id])

  const handleUpdate = async () => {
    if (name) {
      const result = await reportsUseCase.updateTemplate({ id, name })
      if (result) {
        successToast({
          title: "Update succeeded.",
          description: "You've finished updating template.",
        })
        navigator.toTemplates()
      } else {
        errorToast({
          title: "Update failed.",
          description: "You've failed updating template.",
        })
      }
    }
  }

  const handleCancel = () => {
    navigator.toTemplates()
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
          [Templates / Edit]
        </Text>
        <Text
          fontFamily="heading"
          fontSize="56px"
          lineHeight="1"
          letterSpacing="-0.03em"
          fontWeight={500}
          color="nothing.text"
        >
          {name || "Untitled"}
        </Text>
        <Text
          mt="12px"
          fontFamily="mono"
          fontSize="12px"
          color="nothing.textDisabled"
        >
          {id}
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

export default TemplateEdit

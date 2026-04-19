import React, { FC, useState, useRef, useEffect } from "react"
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  IconButton,
  Icon,
  Field,
  Flex,
} from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/tooltip"
import { GrFormUpload, GrTrash } from "react-icons/gr"
import useNavigator from "../navigator"
import UseCaseFactory from "../../../di/UseCaseFactory"
import { setBreadcrumbs } from "../../../infrastructure/state/Breadcrumbs"
import { successToast, errorToast } from "../../../infrastructure/state/Toast"

interface Props {}

const TemplateNew: FC<Props> = () => {
  const [name, setName] = useState<string>("")
  const [file, setFile] = useState<File | undefined>(undefined)

  const fileRef = useRef<HTMLInputElement>(null)

  const navigator = useNavigator()
  const reportUseCase = UseCaseFactory.createReportsUseCase()

  useEffect(() => {
    setBreadcrumbs([
      { func: navigator.toTemplates, title: "Templates" },
      { title: "New" },
    ])
  }, [])

  const handleCreate = async () => {
    if (name && file) {
      const result = await reportUseCase.registerTemplate({ name, file })
      if (result) {
        successToast({
          title: "Upload updated.",
          description: "You've finished uploading template.",
        })
        navigator.toTemplates()
      } else {
        errorToast({
          title: "Upload failed.",
          description: "You've failed uploading template.",
        })
      }
    }
  }

  const handleCancel = () => {
    navigator.toTemplates()
  }

  const handleClearFile = () => {
    setFile(undefined)
  }

  const handleOpenFileWindow = () => {
    fileRef.current?.click()
  }

  const handleSelectFile = () => {
    const files = fileRef.current?.files
    if (!files || !files.length) {
      setFile(undefined)
    } else {
      setFile(files[0])
      if (fileRef.current) {
        fileRef.current.value = ""
      }
    }
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
          [Templates / New]
        </Text>
        <Text
          fontFamily="heading"
          fontSize="56px"
          lineHeight="1"
          letterSpacing="-0.03em"
          fontWeight={500}
          color="nothing.text"
        >
          New template.
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
            placeholder="Untitled template"
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
            File
          </Field.Label>
          <Input
            type="file"
            ref={fileRef}
            onChange={handleSelectFile}
            css={{ visibility: "hidden", width: 0, height: 0, position: "absolute" }}
          />
          <Flex
            alignItems="center"
            justifyContent="space-between"
            borderBottomWidth="1px"
            borderColor="nothing.border"
            pb="12px"
          >
            <Text
              fontFamily="mono"
              fontSize="14px"
              color={file ? "nothing.text" : "nothing.textDisabled"}
            >
              {file ? file.name : "[no file selected]"}
            </Text>
            {file ? (
              <Tooltip content="Clear file">
                <IconButton
                  variant={"actionIcons" as any}
                  aria-label="clear"
                  onClick={handleClearFile}
                >
                  <Icon as={GrTrash} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip content="Upload file">
                <IconButton
                  variant={"actionIcons" as any}
                  aria-label="upload"
                  onClick={handleOpenFileWindow}
                >
                  <Icon as={GrFormUpload} />
                </IconButton>
              </Tooltip>
            )}
          </Flex>
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
          disabled={!name || !file}
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

export default TemplateNew

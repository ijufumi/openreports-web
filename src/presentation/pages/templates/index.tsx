import React, { FC, useEffect, useState } from "react"
import {
  VStack,
  HStack,
  Box,
  Text,
  Link,
  Flex,
  Button,
  Wrap,
  WrapItem,
  IconButton,
  Icon,
} from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/tooltip"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { setBreadcrumbs } from "../../../infrastructure/state/Breadcrumbs"
import UseCaseFactory from "../../../di/UseCaseFactory"
import TemplateVo from "../../../application/dto/vos/responses/TemplateVo"
import DataTable from "../../components/data_table/DataTable"
import useNavigator from "../navigator"
import { successToast, errorToast } from "../../../infrastructure/state/Toast"
import { GrTrash } from "react-icons/gr"
import { useLocation } from "react-router"

interface Props {}

class ExTemplateVo extends TemplateVo {
  readonly canDelete: boolean = false
  constructor(original: TemplateVo, canDelete: boolean) {
    super(original)
    this.canDelete = canDelete
  }
}

const Templates: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [templates, setTemplates] = useState<Array<ExTemplateVo>>([])
  const [totalCount, setTotalCount] = useState(0)

  const navigator = useNavigator()
  const { state } = useLocation()
  const reportsUseCase = UseCaseFactory.createReportsUseCase()

  useEffect(() => {
    const initialize = async () => {
      const _templates = await reportsUseCase.templates({
        page: 0,
        limit: 10,
      })
      if (_templates !== undefined) {
        setTemplates(await convertToExTemplateVo(_templates.items))
        setTotalCount(_templates.count)
      }
      setInitialized(true)
      setBreadcrumbs([{ title: "Templates" }])
    }
    initialize()
  }, [state])

  const convertToExTemplateVo = async (data: Array<TemplateVo>) => {
    if (!data || data.length == 0) {
      return []
    }

    const converted: Array<ExTemplateVo> = []
    for (let i = 0; i < data.length; i++) {
      const v = data[i]
      const canDelete = await canDeleteTemplate(v.id)
      converted.push(new ExTemplateVo(v, canDelete))
    }
    return converted
  }

  const handleOnChange = async (page: number, limit: number) => {
    const _templates = await reportsUseCase.templates({ page, limit })
    if (_templates !== undefined) {
      setTemplates(await convertToExTemplateVo(_templates.items))
      setTotalCount(_templates.count)
    }
  }

  const handleClick = (id: string) => {
    navigator.toTemplateEdit(id)
  }

  const handleClickNew = () => {
    navigator.toTemplateNew()
  }

  const handleDelete = async (id: string) => {
    const result = await reportsUseCase.deleteTemplate({ id })
    if (result) {
      successToast({
        title: "Delete succeeded.",
        description: "You've finished deleting template.",
      })
      navigator.toTemplates()
    } else {
      errorToast({
        title: "Delete failed.",
        description: "You've failed deleting template.",
      })
    }
  }

  const canDeleteTemplate = async (templateId: string) => {
    const page = 0
    const limit = 1
    const reports = await reportsUseCase.reports({ page, limit, templateId })
    return reports?.count === 0
  }

  if (!initialized) {
    return null
  }

  const columnHelper = createColumnHelper<ExTemplateVo>()

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (props) => {
        if (!props.getValue()) {
          return ""
        }
        return (
          <Link
            fontFamily="mono"
            fontSize="13px"
            onClick={() => handleClick(props.getValue())}
          >
            {props.getValue()}
          </Link>
        )
      },
      size: 120,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("storageType", {
      header: "Storage",
      cell: (props) => (
        <Text
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.1em"
          textTransform="uppercase"
          color="nothing.textSecondary"
        >
          {props.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("fileSize", {
      header: "Size",
      cell: (props) => (
        <Text fontFamily="mono" fontSize="13px" color="nothing.text">
          {props.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("formattedCreatedAt", {
      header: "Created",
      cell: (props) => (
        <Text fontFamily="mono" fontSize="12px" color="nothing.textSecondary">
          {props.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("formattedUpdatedAt", {
      header: "Updated",
      cell: (props) => (
        <Text fontFamily="mono" fontSize="12px" color="nothing.textSecondary">
          {props.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("canDelete", {
      header: "",
      cell: (props) => {
        if (!!!props || !!!props.row) {
          return undefined
        }
        const templateId = props.row.getValue("id") as string
        if (!templateId) {
          return undefined
        }
        return (
          <Wrap gap={2} justify="flex-end">
            <WrapItem>
              <Tooltip content="Delete template">
                <IconButton
                  disabled={!props.getValue()}
                  variant={"actionIcons" as any}
                  aria-label="delete"
                  onClick={() => handleDelete(templateId)}
                >
                  <Icon as={GrTrash} />
                </IconButton>
              </Tooltip>
            </WrapItem>
          </Wrap>
        )
      },
    }),
  ] as ColumnDef<ExTemplateVo>[]

  return (
    <VStack gap="32px" align="stretch">
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Text
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.25em"
            textTransform="uppercase"
            color="nothing.textSecondary"
            mb="8px"
          >
            [02 / Templates]
          </Text>
          <HStack gap="16px" alignItems="baseline">
            <Text
              fontFamily="heading"
              fontSize="56px"
              lineHeight="1"
              letterSpacing="-0.03em"
              fontWeight={500}
              color="nothing.text"
            >
              Templates
            </Text>
            <Text
              fontFamily="mono"
              fontSize="13px"
              color="nothing.textSecondary"
            >
              {totalCount} total
            </Text>
          </HStack>
          <Text
            mt="8px"
            fontSize="14px"
            color="nothing.textSecondary"
            maxW="480px"
          >
            Manage your report templates and layouts.
          </Text>
        </Box>
        <Button
          onClick={handleClickNew}
          h="44px"
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.2em"
          textTransform="uppercase"
        >
          + New
        </Button>
      </Flex>

      <DataTable
        columns={columns}
        data={templates}
        totalCount={totalCount}
        onChange={handleOnChange}
      />
    </VStack>
  )
}

export default Templates

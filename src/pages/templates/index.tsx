import React, { FC, useEffect, useState } from "react";
import {
  VStack,
  Link,
  Flex,
  Button,
  Wrap,
  WrapItem,
  Tooltip,
  IconButton,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import TemplatesVo from "../../vos/TemplatesVo";
import useBreadcrumbs from "../../states/Breadcrumbs";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import TemplateVo from "../../vos/TemplateVo";
import DataTable from "../../components/data_table/DataTable";
import useNavigator from "../navigator";
import { GrTrash } from "react-icons/gr";

interface Props {}

const Templates: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [templates, setTemplates] = useState<TemplatesVo | undefined>(
    undefined
  );

  const toast = useToast();
  const breadcrumbs = useBreadcrumbs();
  const navigator = useNavigator();
  const reportsUseCase = UseCaseFactory.createReportsUseCase();

  useEffect(() => {
    if (initialized) {
      return;
    }
    const initialize = async () => {
      const _reportTemplates = await reportsUseCase.templates({
        page: 0,
        limit: 10,
      });
      if (_reportTemplates !== undefined) {
        setTemplates(_reportTemplates);
      }
      setInitialized(true);
      breadcrumbs.set([
        {
          title: "Templates",
        },
      ]);
    };
    initialize();
  }, []);

  const handleOnChange = async (page: number, limit: number) => {
    const _templates = await reportsUseCase.templates({ page, limit });
    if (_templates !== undefined) {
      setTemplates(_templates);
    }
  };

  const handleClick = (id: string) => {
    navigator.toTemplateEdit(id);
  };

  const handleClickNew = () => {
    navigator.toTemplateNew();
  };

  const handleDelete = async (id: string) => {
    const result = await reportsUseCase.deleteTemplate({ id });
    if (result) {
      toast({
        title: "Delete succeeded.",
        description: "You've finished deleting template.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigator.toTemplates();
    } else {
      toast({
        title: "Delete failed.",
        description: "You've failed deleting template.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const canDeleteTemplate = async (templateId: string) => {
    const page = 0;
    const limit = 1;
    const reports = await reportsUseCase.reports({ page, limit, templateId });
    return reports?.count === 0;
  };

  if (!initialized) {
    return null;
  }

  const columnHelper = createColumnHelper<TemplateVo>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (props) => {
        if (!props.getValue()) {
          return "";
        }
        return (
          <Link onClick={() => handleClick(props.getValue())}>
            {props.getValue()}
          </Link>
        );
      },
      size: 100,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("storageType", {
      header: "Storage Type",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("fileSize", {
      header: "Size",
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
      cell: async (props) => {
        const templateId = props.row.getValue("id") as string;
        if (!templateId) {
          return undefined;
        }
        const canDelete = await canDeleteTemplate(templateId);
        return (
          <Wrap spacing={5}>
            <WrapItem>
              <Tooltip label="Delete report">
                <IconButton
                  disabled={!canDelete}
                  icon={<Icon as={GrTrash} />}
                  variant="actionIcons"
                  aria-label="output"
                  onClick={() => handleDelete(templateId)}
                />
              </Tooltip>
            </WrapItem>
          </Wrap>
        );
      },
    }),
  ] as ColumnDef<TemplateVo>[];

  return (
    <VStack>
      <Flex w="100%" justifyContent="flex-end">
        <Button onClick={handleClickNew} variant="action">
          Create
        </Button>
      </Flex>
      <DataTable
        columns={columns}
        data={templates?.items || []}
        totalCount={templates?.count || 0}
        onChange={handleOnChange}
      />
    </VStack>
  );
};

export default Templates;

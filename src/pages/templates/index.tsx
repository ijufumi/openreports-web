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
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import TemplatesVo from "../../vos/TemplatesVo";
import useBreadcrumbs from "../../states/Breadcrumbs";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import TemplateVo from "../../vos/TemplateVo";
import DataTable from "../../components/data_table/DataTable";
import useNavigator from "../navigator";
import useToastMessageState from "../../states/ToastMessage";
import { GrTrash } from "react-icons/gr";

interface Props {}

class ExTemplateVo extends TemplateVo {
  readonly canDelete: boolean = false;
  constructor(original: TemplateVo, canDelete: boolean) {
    super(original);
    this.canDelete = canDelete;
  }
}

const Templates: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [templates, setTemplates] = useState<Array<ExTemplateVo>>([]);
  const [totalCount, setTotalCount] = useState(0);

  const toastState = useToastMessageState();
  const breadcrumbs = useBreadcrumbs();
  const navigator = useNavigator();
  const reportsUseCase = UseCaseFactory.createReportsUseCase();

  useEffect(() => {
    if (initialized) {
      return;
    }
    const initialize = async () => {
      const _templates = await reportsUseCase.templates({
        page: 0,
        limit: 10,
      });
      if (_templates !== undefined) {
        setTemplates(await convertToExTemplateVo(_templates.items));
        setTotalCount(_templates.count);
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

  const convertToExTemplateVo = async (data: Array<TemplateVo>) => {
    if (!data || !data.length) {
      return [];
    }

    const converted: Array<ExTemplateVo> = [];
    for (let i = 0; i < data.length; i++) {
      const v = data[i];
      const canDelete = await canDeleteTemplate(v.id);
      converted.push(new ExTemplateVo(v, canDelete));
    }
    return converted;
  };

  const handleOnChange = async (page: number, limit: number) => {
    const _templates = await reportsUseCase.templates({ page, limit });
    if (_templates !== undefined) {
      setTemplates(await convertToExTemplateVo(_templates.items));
      setTotalCount(_templates.count);
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
      toastState.successMessage({
        title: "Delete succeeded.",
        description: "You've finished deleting template.",
      });
      navigator.toTemplates();
    } else {
      toastState.errorMessage({
        title: "Delete failed.",
        description: "You've failed deleting template.",
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

  const columnHelper = createColumnHelper<ExTemplateVo>();

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
    columnHelper.accessor("canDelete", {
      header: "Actions",
      cell: (props) => {
        if (!props || !props.row) {
          return undefined;
        }
        const templateId = props.row.getValue("id") as string;
        if (!templateId) {
          return undefined;
        }
        console.log(props.getValue());
        return (
          <Wrap spacing={5} display="flex" justifyContent="center">
            <WrapItem>
              <Tooltip label="Delete report">
                <IconButton
                  disabled={!props.getValue()}
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
  ] as ColumnDef<ExTemplateVo>[];

  return (
    <VStack>
      <Flex w="100%" justifyContent="flex-end">
        <Button onClick={handleClickNew} variant="action">
          Create
        </Button>
      </Flex>
      <DataTable
        columns={columns}
        data={templates}
        totalCount={totalCount}
        onChange={handleOnChange}
      />
    </VStack>
  );
};

export default Templates;

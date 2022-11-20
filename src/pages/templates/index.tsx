import React, { FC, useEffect, useState } from "react";
import { HStack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import TemplatesVo from "../../vos/TemplatesVo";
import useBreadcrumbs from "../../states/Breadcrumbs";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import TemplateVo from "../../vos/TemplateVo";
import DataTable from "../../components/data_table/DataTable";

interface Props {}

const Templates: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [templates, setTemplates] = useState<TemplatesVo | undefined>(
    undefined
  );

  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();
  const reportsUseCase = UseCaseFactory.createReportsUseCase();

  useEffect(() => {
    if (initialized) {
      return;
    }
    const initialize = async () => {
      const _reportTemplates = await reportsUseCase.templates(0, 10);
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
  });

  const handleOnChange = async (pageIndex: number, pageSize: number) => {
    const _reportTemplates = await reportsUseCase.templates(
      pageIndex,
      pageSize
    );
    if (_reportTemplates !== undefined) {
      setTemplates(_reportTemplates);
    }
  };

  const handleClick = (id: string) => {
    navigate(`/report_templates/${id}`);
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
  ] as ColumnDef<TemplateVo>[];

  return (
    <HStack>
      <DataTable
        columns={columns}
        data={templates?.items || []}
        totalCount={templates?.count || 0}
        onChange={handleOnChange}
      />
    </HStack>
  );
};

export default Templates;

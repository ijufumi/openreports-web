import React, { FC, useEffect, useState } from "react";
import { HStack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import ReportTemplatesVo from "../../vos/ReportTemplatesVo";
import useBreadcrumbs from "../../states/Breadcrumbs";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import ReportTemplateVo from "../../vos/ReportTemplateVo";
import DataTable from "../../components/data_table/DataTable";

interface Props {}

const ReportTemplates: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [reportTemplates, setReportTemplates] = useState<
    ReportTemplatesVo | undefined
  >(undefined);

  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();
  const reportsUseCase = UseCaseFactory.createReportsUseCase();

  useEffect(() => {
    if (initialized) {
      return;
    }
    const initialize = async () => {
      const _reportTemplates = await reportsUseCase.reportTemplates(0, 10);
      if (_reportTemplates !== undefined) {
        setReportTemplates(_reportTemplates);
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
    const _reportTemplates = await reportsUseCase.reportTemplates(
      pageIndex,
      pageSize
    );
    if (_reportTemplates !== undefined) {
      setReportTemplates(_reportTemplates);
    }
  };

  const handleClick = (id: string) => {
    navigate(`/report_templates/${id}`);
  };

  if (!initialized) {
    return null;
  }

  const columnHelper = createColumnHelper<ReportTemplateVo>();

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
      header: "StorageType",
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
  ] as ColumnDef<ReportTemplateVo>[];

  return (
    <HStack>
      <DataTable
        columns={columns}
        data={reportTemplates?.items || []}
        totalCount={reportTemplates?.count || 0}
        onChange={handleOnChange}
      />
    </HStack>
  );
};

export default ReportTemplates;

import React, { FC, useState, useEffect } from "react";
import { HStack } from "@chakra-ui/react";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import ReportsVo from "../../vos/ReportsVo";
import ReportVo from "../../vos/ReportVo";
import DataTable from "../../components/data_table/DataTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

interface Props {}

const Reports: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [reports, setReports] = useState<ReportsVo | undefined>(undefined);

  const reportsUseCase = UseCaseFactory.createReportsUseCase();

  useEffect(() => {
    if (initialized) {
      return;
    }
    const initialize = async () => {
      const reports = await reportsUseCase.reports(0, 10);
      if (reports !== undefined) {
        setReports(reports);
      }
      setInitialized(true);
    };
    initialize();
  });

  if (!initialized) {
    return null;
  }

  const columnHelper = createColumnHelper<ReportVo>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (props) => props.getValue(),
      size: 100,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("reportTemplateName", {
      header: "Template name",
      cell: (props) => props.getValue(),
    }),
  ] as ColumnDef<ReportVo>[];

  return (
    <HStack>
      <DataTable
        columns={columns}
        data={reports?.items || []}
        pageSizes={[10]}
        defaultPageSize={10}
        pageCount={reports?.count || 0}
      />
    </HStack>
  );
};

export default Reports;

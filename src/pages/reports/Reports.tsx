import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { HStack, Link, Wrap, WrapItem, Button } from "@chakra-ui/react";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import ReportsVo from "../../vos/ReportsVo";
import ReportVo from "../../vos/ReportVo";
import DataTable from "../../components/data_table/DataTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import useBreadcrumbs from "../../states/Breadcrumbs";

interface Props {}

const Reports: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [reports, setReports] = useState<ReportsVo | undefined>(undefined);

  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();
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
      breadcrumbs.set([
        {
          title: "Reports",
        },
      ]);
    };
    initialize();
  });

  const handleOnChange = async (pageIndex: number, pageSize: number) => {
    const reports = await reportsUseCase.reports(pageIndex, pageSize);
    if (reports !== undefined) {
      setReports(reports);
    }
  };

  const handleOutput = async (id: string) => {
    const data = await reportsUseCase.outputReport(id);
    if (data) {
      console.warn(data);
    }
  };

  const handleDelete = async (id: string) => {
    await reportsUseCase.deleteReport(id);
  };

  const handleClick = (id: string) => {
    navigate(`/reports/${id}`);
  };

  if (!initialized) {
    return null;
  }

  const columnHelper = createColumnHelper<ReportVo>();

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
    columnHelper.accessor("reportTemplateName", {
      header: "Template name",
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
      cell: (props) => {
        return (
          <Wrap spacing={1}>
            <WrapItem>
              <Button onClick={() => handleClick(props.row.getValue("id"))}>
                Output
              </Button>
            </WrapItem>
            <WrapItem>
              <Button onClick={() => handleDelete(props.row.getValue("id"))}>
                Delete
              </Button>
            </WrapItem>
          </Wrap>
        );
      },
    }),
  ] as ColumnDef<ReportVo>[];

  return (
    <HStack>
      <DataTable
        columns={columns}
        data={reports?.items || []}
        totalCount={reports?.count || 0}
        onChange={handleOnChange}
      />
    </HStack>
  );
};

export default Reports;

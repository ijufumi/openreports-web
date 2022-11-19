import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  HStack,
  Link,
  Wrap,
  WrapItem,
  Icon,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { GrDocumentPdf, GrTrash } from "react-icons/gr";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import ReportsVo from "../../vos/ReportsVo";
import ReportVo from "../../vos/ReportVo";
import DataTable from "../../components/data_table/DataTable";
import useBreadcrumbs from "../../states/Breadcrumbs";
import { AuthorizedPath } from "../paths";
import DownloadUtils from "../../components/utils/DownloadUtils";
import DateUtils from "../../components/utils/DateUtils";

interface Props {}

const Reports: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [reports, setReports] = useState<ReportsVo | undefined>(undefined);

  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();
  const reportsUseCase = UseCaseFactory.createReportsUseCase();
  const toast = useToast();

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
      const fileName = `sample-${DateUtils.nowAsString(
        "YYYYMMDD-HHmmss"
      )}.xlsx`;
      DownloadUtils.download(data, fileName);
    } else {
      toast({
        title: "Edit didn't output.",
        description: "You couldn't output report because of errors.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: string) => {
    await reportsUseCase.deleteReport(id);
  };

  const handleClick = (id: string) => {
    navigate(AuthorizedPath.reportEdit.replace(":id", id));
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
        const reportId = props.row.getValue("id") as string;
        if (!reportId) {
          return undefined;
        }
        return (
          <Wrap spacing={5}>
            <WrapItem>
              <Tooltip label="Output report">
                <IconButton
                  icon={<Icon as={GrDocumentPdf} />}
                  variant="actions"
                  aria-label="output"
                  onClick={() => handleOutput(reportId)}
                />
              </Tooltip>
            </WrapItem>
            <WrapItem>
              <Tooltip label="Delete report">
                <IconButton
                  icon={<Icon as={GrTrash} />}
                  variant="actions"
                  aria-label="output"
                  onClick={() => handleDelete(reportId)}
                />
              </Tooltip>
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

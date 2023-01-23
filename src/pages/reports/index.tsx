import React, { FC, useState, useEffect } from "react";
import {
  VStack,
  Link,
  Wrap,
  WrapItem,
  Icon,
  IconButton,
  Tooltip,
  Flex,
  Button,
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { GrDocumentPdf, GrTrash } from "react-icons/gr";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import ReportsVo from "../../vos/ReportsVo";
import ReportVo from "../../vos/ReportVo";
import DataTable from "../../components/data_table/DataTable";
import { setBreadcrumbs } from "../../states/Breadcrumbs";
import DownloadUtils from "../../components/utils/download/DownloadUtils";
import DateUtils from "../../components/utils/date/DateUtils";
import useNavigator from "../navigator";
import { successToast, errorToast } from "../../states/Toast";

interface Props {}

const Reports: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [reports, setReports] = useState<ReportsVo | undefined>(undefined);

  const navigator = useNavigator();
  const reportsUseCase = UseCaseFactory.createReportsUseCase();

  useEffect(() => {
    if (initialized) {
      return;
    }
    const initialize = async () => {
      const reports = await reportsUseCase.reports({ page: 0, limit: 10 });
      if (reports !== undefined) {
        setReports(reports);
      }
      setInitialized(true);
      setBreadcrumbs([
        {
          title: "Reports",
        },
      ]);
    };
    initialize();
  }, []);

  const handleOnChange = async (page: number, limit: number) => {
    const reports = await reportsUseCase.reports({ page, limit });
    if (reports !== undefined) {
      setReports(reports);
    }
  };

  const handleOutput = async (id: string) => {
    const data = await reportsUseCase.outputReport({ id });
    if (data) {
      const fileName = `sample-${DateUtils.nowAsString(
        "YYYYMMDD-HHmmss"
      )}.xlsx`;
      DownloadUtils.download(data, fileName);
    } else {
      errorToast({
        title: "Edit didn't output.",
        description: "You couldn't output report because of errors.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    await reportsUseCase.deleteReport({ id });
  };

  const handleClick = (id: string) => {
    navigator.toReportEdit(id);
  };

  const handleClickNew = () => {
    navigator.toReportNew();
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
    columnHelper.accessor("templateName", {
      header: "TemplateVo name",
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
                  variant="actionIcons"
                  aria-label="output"
                  onClick={() => handleOutput(reportId)}
                />
              </Tooltip>
            </WrapItem>
            <WrapItem>
              <Tooltip label="Delete report">
                <IconButton
                  icon={<Icon as={GrTrash} />}
                  variant="actionIcons"
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
    <VStack>
      <Flex w="100%" justifyContent="flex-end">
        <Button onClick={handleClickNew} variant="action">
          Create
        </Button>
      </Flex>
      <DataTable
        columns={columns}
        data={reports?.items || []}
        totalCount={reports?.count || 0}
        onChange={handleOnChange}
      />
    </VStack>
  );
};

export default Reports;

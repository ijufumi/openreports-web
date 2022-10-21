import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  HStack,
  Box,
  Grid,
  GridItem,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import ReportVo from "../../vos/ReportVo";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import useBreadcrumbs from "../../states/Breadcrumbs";
import ReportTemplateVo from "../../vos/ReportTemplateVo";

interface Props {}

const Report: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [report, setReport] = useState<ReportVo | undefined>(undefined);
  const [reportTemplates, setReportTemplates] = useState<ReportTemplateVo[]>(
    []
  );
  const [name, setName] = useState<string>("");
  const [reportTemplateId, setReportTemplateId] = useState<string>("");

  const params = useParams();
  const breadcrumbs = useBreadcrumbs();
  const navigate = useNavigate();
  const id = params.id;

  const reportsUseCase = UseCaseFactory.createReportsUseCase();

  useEffect(() => {
    const initialize = async () => {
      if (id) {
        const _report = await reportsUseCase.report(id);
        setReport(_report);
        if (_report) {
          setName(_report.name);
        }
      }
      const reportTemplatesVo = await reportsUseCase.reportTemplates(0, -1);
      if (reportTemplatesVo) {
        setReportTemplates(reportTemplatesVo.items);
      }
      breadcrumbs.set([
        {
          path: "/reports",
          title: "Reports",
        },
        {
          title: id || "",
        },
      ]);
      setInitialized(true);
    };
    initialize();
  }, [id]);

  if (!initialized) {
    return null;
  }

  if (!report) {
    navigate("/error/notfound");
    return null;
  }

  return (
    <HStack>
      <Box
        m={5}
        sx={{ borderRadius: "10px", borderColor: "gray.50", bgColor: "white" }}
        p={5}
        w="50%"
      >
        <Grid templateColumns="repeat(5, 1fr)" gap={0}>
          <GridItem colSpan={2} h={50} display="flex" alignItems="center">
            <Text fontWeight={600}>ID</Text>
          </GridItem>
          <GridItem colSpan={3} h={50} display="flex" alignItems="center">
            <Text>{report.id}</Text>
          </GridItem>
          <GridItem
            colSpan={2}
            h={50}
            display="flex"
            alignItems="center"
            bgColor="gray.50"
          >
            <Text fontWeight={600}>Name</Text>
          </GridItem>
          <GridItem
            colSpan={3}
            h={50}
            display="flex"
            alignItems="center"
            bgColor="gray.50"
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </GridItem>
          <GridItem colSpan={2} h={50} display="flex" alignItems="center">
            <Text fontWeight={600}>Template name</Text>
          </GridItem>
          <GridItem colSpan={3} h={50} display="flex" alignItems="center">
            <Select
              onChange={(e) => setReportTemplateId(e.target.value)}
              value={reportTemplateId}
            >
              {reportTemplates.map((template) => {
                return (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                );
              })}
            </Select>
          </GridItem>
          <GridItem
            colSpan={2}
            h={50}
            display="flex"
            alignItems="center"
            bgColor="gray.50"
          >
            <Text fontWeight={600}>Created at</Text>
          </GridItem>
          <GridItem
            colSpan={3}
            h={50}
            display="flex"
            alignItems="center"
            bgColor="gray.50"
          >
            <Text>{report.formattedCreatedAt}</Text>
          </GridItem>
          <GridItem colSpan={2} h={50} display="flex" alignItems="center">
            <Text fontWeight={600}>Updated at</Text>
          </GridItem>
          <GridItem colSpan={3} h={50} display="flex" alignItems="center">
            <Text>{report.formattedUpdatedAt}</Text>
          </GridItem>
        </Grid>
      </Box>
    </HStack>
  );
};

export default Report;

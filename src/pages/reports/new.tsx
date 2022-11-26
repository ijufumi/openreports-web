import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Input,
  Select,
  Button,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import useBreadcrumbs from "../../states/Breadcrumbs";
import TemplateVo from "../../vos/TemplateVo";
import useNavigator from "../navigator";

interface Props {}

const ReportNew: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [reportTemplates, setReportTemplates] = useState<TemplateVo[]>([]);
  const [name, setName] = useState<string>("");
  const [reportTemplateId, setReportTemplateId] = useState<string>("");

  const breadcrumbs = useBreadcrumbs();
  const navigator = useNavigator();
  const toast = useToast();
  const id = "";

  const reportsUseCase = UseCaseFactory.createReportsUseCase();

  useEffect(() => {
    const initialize = async () => {
      const reportTemplatesVo = await reportsUseCase.templates(0, -1);
      if (reportTemplatesVo) {
        setReportTemplates(reportTemplatesVo.items);
      }
      breadcrumbs.set([
        {
          func: navigator.toReports,
          title: "Reports",
        },
        {
          title: "new",
        },
      ]);
      setInitialized(true);
    };
    initialize();
  }, [id]);

  const handleUpdate = async () => {
    const _report = await reportsUseCase.updateReport(
      id,
      name,
      reportTemplateId
    );
    if (_report) {
      toast({
        title: "Edit updated.",
        description: "You've finished updating report well.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Edit didn't updated.",
        description: "You couldn't update report because of errors.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    navigator.toReports();
  };

  if (!initialized) {
    return null;
  }

  return (
    <Box
      sx={{ borderRadius: "10px", borderColor: "gray.50", bgColor: "white" }}
      p={5}
      w="50%"
    >
      <Grid templateColumns="repeat(5, 1fr)" gap={0}>
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
      </Grid>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <Wrap spacingX={2}>
          <WrapItem>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </WrapItem>
          <WrapItem>
            <Button onClick={handleUpdate}>Update</Button>
          </WrapItem>
        </Wrap>
      </Box>
    </Box>
  );
};

export default ReportNew;

import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { HStack, Box } from "@chakra-ui/react";
import ReportVo from "../../vos/ReportVo";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import useBreadcrumbs from "../../states/Breadcrumbs";

interface Props {}

const Report: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [report, setReport] = useState<ReportVo | undefined>(undefined);

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
      <Box m={5} sx={{ borderRadius: "20px", borderColor: "gray.50" }}>
        <HStack></HStack>
      </Box>
    </HStack>
  );
};

export default Report;

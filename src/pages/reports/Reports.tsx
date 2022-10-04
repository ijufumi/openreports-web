import React, { FC, useState, useEffect } from "react";
import {
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import ReportsVo from "../../vos/ReportsVo";

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

  return (
    <HStack>
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Report</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Template name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports &&
              reports.items.map((r) => {
                return (
                  <Tr>
                    <Td>{r.id}</Td>
                    <Td>{r.name}</Td>
                    <Td>{r.reportTemplateName}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </HStack>
  );
};

export default Reports;

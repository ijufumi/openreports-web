import React, { FC, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Input,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { AuthorizedPath } from "../paths";

interface Props {}

const ReportTemplateNew: FC<Props> = () => {
  const [name, setName] = useState<string>("");
  const [templateFile, setTemplateFile] = useState<File | undefined>(undefined);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(AuthorizedPath.reportTemplates);
  };

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
          <Text fontWeight={600}>File</Text>
        </GridItem>
        <GridItem colSpan={3} h={50} display="flex" alignItems="center">
          <Text>{templateFile ? templateFile.name : "None"}</Text>
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
            <Button>Create</Button>
          </WrapItem>
        </Wrap>
      </Box>
    </Box>
  );
};

export default ReportTemplateNew;

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
  Tooltip,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { GrFormUpload, GrTrash } from "react-icons/gr";
import useNavigator from "../navigator";

interface Props {}

const TemplateNew: FC<Props> = () => {
  const [name, setName] = useState<string>("");
  const [templateFile, setTemplateFile] = useState<File | undefined>(undefined);

  const navigator = useNavigator();

  const handleCancel = () => {
    navigator.toTemplates();
  };

  const handleClearFile = () => {
    setTemplateFile(undefined);
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
          <Box ml={2}>
            {templateFile ? (
              <Tooltip label="Clear file">
                <IconButton
                  icon={<Icon as={GrTrash} />}
                  variant="actions"
                  aria-label="output"
                  onClick={handleClearFile}
                />
              </Tooltip>
            ) : (
              <Tooltip label="Upload file">
                <IconButton
                  icon={<Icon as={GrFormUpload} />}
                  variant="actions"
                  aria-label="output"
                  onClick={handleClearFile}
                />
              </Tooltip>
            )}
          </Box>
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

export default TemplateNew;

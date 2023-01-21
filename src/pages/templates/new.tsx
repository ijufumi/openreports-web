import React, { FC, useState, useRef, useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { GrFormUpload, GrTrash } from "react-icons/gr";
import useNavigator from "../navigator";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import useBreadcrumbs from "../../states/Breadcrumbs";

interface Props {}

const TemplateNew: FC<Props> = () => {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);

  const fileRef = useRef<HTMLInputElement>(null);

  const toast = useToast();
  const navigator = useNavigator();
  const breadcrumbs = useBreadcrumbs();
  const reportUseCase = UseCaseFactory.createReportsUseCase();

  useEffect(() => {
    breadcrumbs.set([
      {
        title: "Templates",
      },
    ]);
  }, []);

  const handleCreate = async () => {
    if (name && file) {
      const result = await reportUseCase.registerTemplate({ name, file });
      if (result) {
        toast({
          title: "Upload updated.",
          description: "You've finished uploading template.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigator.toTemplates();
      } else {
        toast({
          title: "Upload failed.",
          description: "You've failed uploading template.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleCancel = () => {
    navigator.toTemplates();
  };

  const handleClearFile = () => {
    setFile(undefined);
  };

  const handleOpenFileWindow = () => {
    fileRef.current?.click();
  };

  const handleSelectFile = () => {
    const files = fileRef.current?.files;
    if (!files || !files.length) {
      setFile(undefined);
    } else {
      setFile(files[0]);
      fileRef.current.value = "";
    }
  };

  return (
    <Box
      sx={{ borderRadius: "10px", borderColor: "gray.100", bgColor: "white" }}
      p={5}
      w="50%"
    >
      <Grid templateColumns="repeat(5, 1fr)" gap={0}>
        <GridItem
          colSpan={2}
          h={50}
          p={5}
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
          <Input
            variant="flushed"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </GridItem>
        <GridItem colSpan={2} h={50} p={5} display="flex" alignItems="center">
          <Text fontWeight={600}>File</Text>
        </GridItem>
        <GridItem colSpan={3} h={50} display="flex" alignItems="center">
          <Text>{file ? file.name : "None"}</Text>
          <Input
            type="file"
            sx={{ visibility: "hidden", width: 0 }}
            ref={fileRef}
            onChange={handleSelectFile}
          />
          <Box ml={2}>
            {file ? (
              <Tooltip label="Clear file" aria-label="file">
                <IconButton
                  icon={<Icon as={GrTrash} />}
                  variant="actionIcons"
                  aria-label="output"
                  onClick={handleClearFile}
                />
              </Tooltip>
            ) : (
              <Tooltip label="Upload file" aria-label="file">
                <IconButton
                  icon={<Icon as={GrFormUpload} />}
                  variant="actionIcons"
                  aria-label="output"
                  onClick={handleOpenFileWindow}
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
            <Button onClick={handleCreate}>Create</Button>
          </WrapItem>
        </Wrap>
      </Box>
    </Box>
  );
};

export default TemplateNew;

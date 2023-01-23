import React, { FC, useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Input,
  Wrap,
  WrapItem,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import useNavigator from "../../navigator";
import UseCaseFactory from "../../../use_cases/UseCaseFactory";
import useBreadcrumbs from "../../../states/Breadcrumbs";
import { successToast, errorToast } from "../../../states/Toast";

interface Props {}

const TemplateEdit: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const params = useParams();
  const navigator = useNavigator();
  const breadcrumbs = useBreadcrumbs();
  const reportsUseCase = UseCaseFactory.createReportsUseCase();

  const id = params.id || "";

  useEffect(() => {
    const initialize = async () => {
      if (id) {
        const _template = await reportsUseCase.template({ id });
        if (_template) {
          setName(_template.name);
        } else {
          navigator.toNotfoundError();
          return;
        }
      }
      breadcrumbs.set([
        {
          func: navigator.toTemplates,
          title: "Templates",
        },
        {
          title: id,
        },
      ]);
      setInitialized(true);
    };
    initialize();
  }, [id]);

  const handleUpdate = async () => {
    if (name) {
      const result = await reportsUseCase.updateTemplate({ id, name });
      if (result) {
        successToast({
          title: "Update succeeded.",
          description: "You've finished updating template.",
        });
        navigator.toTemplates();
      } else {
        errorToast({
          title: "Update failed.",
          description: "You've failed updating template.",
        });
      }
    }
  };

  const handleCancel = () => {
    navigator.toTemplates();
  };

  if (!initialized) {
    return null;
  }

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

export default TemplateEdit;

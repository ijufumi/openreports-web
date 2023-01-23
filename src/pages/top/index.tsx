import React, { FC, useEffect } from "react";
import { Stack, Box } from "@chakra-ui/react";
import { setBreadcrumbs } from "../../states/Breadcrumbs";

interface Props {}

const Top: FC<Props> = () => {
  useEffect(() => {
    setBreadcrumbs([]);
  }, []);

  return (
    <Stack>
      <Box>{"top..."}</Box>
    </Stack>
  );
};

export default Top;

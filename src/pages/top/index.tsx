import React, { FC, useEffect } from "react";
import { Stack, Box } from "@chakra-ui/react";
import useBreadcrumbs from "../../states/Breadcrumbs";

interface Props {}

const Top: FC<Props> = () => {
  const breadcrumbs = useBreadcrumbs();

  useEffect(() => {
    breadcrumbs.set([]);
  }, []);

  return (
    <Stack>
      <Box>{"top..."}</Box>
    </Stack>
  );
};

export default Top;

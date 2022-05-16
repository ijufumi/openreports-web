import React, { FC } from "react";
import { HStack, Box } from "@chakra-ui/react";

interface Props {
  children: any;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <HStack spacing={"5px"}>
      <Box w={"30px"}></Box>
      <Box flexGrow={1}>{children}</Box>
    </HStack>
  );
};

export default Layout;

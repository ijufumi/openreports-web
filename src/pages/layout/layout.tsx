import React, { FC } from "react";
import { Stack } from "@chakra-ui/react";

interface Props {
  children: any;
}

const Layout: FC<Props> = ({ children }) => {
  return <Stack>{children}</Stack>;
};

export default Layout;

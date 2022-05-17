import React, { FC } from "react";
import {
  VStack,
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <VStack spacing={"5px"} h={"100%"}>
      <Box
        h={"50px"}
        w={"100%"}
        bg={"white"}
        display={"flex"}
        alignItems={"center"}
        padding={"0 10px 0 10px"}
      >
        <Menu>
          <MenuButton>Test</MenuButton>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box w={"100%"} h={"100%"}>
        {children}
      </Box>
    </VStack>
  );
};

export default Layout;

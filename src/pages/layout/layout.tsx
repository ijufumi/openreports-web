import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  VStack,
  HStack,
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Icon,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import logoImg from "../../assets/logo.png";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <VStack spacing={"5px"} h={"100%"}>
      <Box
        h={"70px"}
        w={"100%"}
        bg={"white"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"0 10px 0 10px"}
      >
        <HStack spacing={"10px"}>
          <Box>
            <Image
              onClick={() => navigate("/top")}
              src={logoImg}
              alt={"logo"}
              margin={"10px"}
              style={{
                transform: "scale(0.8, 0.8)",
                cursor: "pointer",
              }}
            />
          </Box>
          <Menu>
            <MenuButton
              sx={{
                bg: "blue.50",
                borderColor: "blue.200",
                borderWidth: "1px",
                borderRadius: "5px",
                h: "40px",
                w: "100px",
              }}
            >
              Menu 1
            </MenuButton>
            <MenuList>
              <MenuItem>Item 1</MenuItem>
              <MenuItem>Item 2</MenuItem>
              <MenuItem>Item 3</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              sx={{
                bg: "blue.50",
                borderColor: "blue.200",
                borderWidth: "1px",
                borderRadius: "5px",
                h: "40px",
                w: "100px",
              }}
            >
              Menu 2
            </MenuButton>
            <MenuList>
              <MenuItem>Item 1</MenuItem>
              <MenuItem>Item 2</MenuItem>
              <MenuItem>Item 3</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              sx={{
                bg: "blue.50",
                borderColor: "blue.200",
                borderWidth: "1px",
                borderRadius: "5px",
                h: "40px",
                w: "100px",
              }}
            >
              Menu 3
            </MenuButton>
            <MenuList>
              <MenuItem>Item 1</MenuItem>
              <MenuItem>Item 2</MenuItem>
              <MenuItem>Item 3</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              sx={{
                bg: "blue.50",
                borderColor: "blue.200",
                borderWidth: "1px",
                borderRadius: "5px",
                h: "40px",
                w: "100px",
              }}
            >
              Menu 4
            </MenuButton>
            <MenuList>
              <MenuItem>Item 1</MenuItem>
              <MenuItem>Item 2</MenuItem>
              <MenuItem>Item 3</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <HStack>
          <IconButton
            aria-label="profile"
            colorScheme="whiteAlpha"
            icon={
              <Icon
                as={FaRegUserCircle}
                color="gray.600"
                w={10}
                h={10}
                style={{ padding: "0 5px 0 5px" }}
              />
            }
          />
        </HStack>
      </Box>
      <Box w={"100%"} h={"100%"} padding={"10px"}>
        {children}
      </Box>
    </VStack>
  );
};

export default Layout;

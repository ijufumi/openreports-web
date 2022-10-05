import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  VStack,
  HStack,
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import logoImg from "../../assets/logo.png";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const navigate = useNavigate();
  const membersUseCase = UseCaseFactory.createMembersUseCase();

  useEffect(() => {
    const initialize = async () => {
      const isLoggedIn = await membersUseCase.isLoggedIn();
      if (!isLoggedIn) {
        await handleLogout();
      }
      setInitialized(true);
    };

    initialize();
  });

  const handleLogout = async () => {
    await membersUseCase.logout();
    navigate("/login");
  };

  if (!initialized) {
    return null;
  }

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <VStack spacing={"5px"} h={"100%"} w={"100%"}>
      <Box
        h={"70px"}
        w={"100%"}
        bg={"white"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"0 10px 0 10px"}
      >
        <HStack spacing={"10px"} w={"100%"}>
          <Box>
            <Image
              minW={"250px"}
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
              Reports
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleClick("/reports")}>
                Report
              </MenuItem>
              <MenuItem>Template</MenuItem>
              <MenuItem>Parameters</MenuItem>
              <MenuItem>Groups</MenuItem>
              <MenuItem>Scheduling</MenuItem>
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
              Settings
            </MenuButton>
            <MenuList>
              <MenuItem>Workspace</MenuItem>
              <MenuItem>DataSource</MenuItem>
              <MenuItem>Logs</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <HStack>
          <Menu>
            <MenuButton
              variant={"profile"}
              as={IconButton}
              aria-label="Options"
              icon={<FaRegUserCircle size="30" style={{ color: "gray" }} />}
            />
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
      <Box w={"100%"} h={"100%"} padding={"10px"}>
        {children}
      </Box>
    </VStack>
  );
};

export default Layout;

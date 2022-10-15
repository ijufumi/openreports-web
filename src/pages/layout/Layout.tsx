import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  VStack,
  HStack,
  Box,
  Menu,
  MenuGroup,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  IconButton,
  Image,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CgMenu } from "react-icons/cg";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import logoImg from "../../assets/logo.png";
import { BreadcrumbsProps } from "../paths";

interface Props {
  children: React.ReactNode;
  breadcrumbs?: Array<BreadcrumbsProps>;
}

const Layout: FC<Props> = ({ children, breadcrumbs }) => {
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
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<CgMenu size="30" />}
              variant={"icon"}
            />
            <MenuList>
              <MenuGroup title={"Reporting"}>
                <MenuItem onClick={() => handleClick("/reports")}>
                  Report
                </MenuItem>
                <MenuItem>Template</MenuItem>
                <MenuItem>Parameters</MenuItem>
                <MenuItem>Groups</MenuItem>
                <MenuItem>Scheduling</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title={"Setting"}>
                <MenuItem>Workspace</MenuItem>
                <MenuItem>DataSource</MenuItem>
                <MenuItem>Logs</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
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
          {breadcrumbs && breadcrumbs.length && (
            <Breadcrumb
              separator={<Icon color="gray.500" as={MdKeyboardArrowRight} />}
            >
              {breadcrumbs.map((b, idx) => {
                return (
                  <BreadcrumbItem
                    isCurrentPage={breadcrumbs?.length - 1 === idx}
                  >
                    <BreadcrumbSeparator />
                    <BreadcrumbLink href={b.path}>{b.title}</BreadcrumbLink>
                  </BreadcrumbItem>
                );
              })}
            </Breadcrumb>
          )}
        </HStack>
        <HStack>
          <Menu>
            <MenuButton
              variant={"icon"}
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

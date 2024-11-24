import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react"
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
  Select,
  useToast,
} from "@chakra-ui/react"
import { FaRegUserCircle } from "react-icons/fa"
import { MdKeyboardArrowRight } from "react-icons/md"
import { CgMenu } from "react-icons/cg"
import UseCaseFactory from "../../usecases/UseCaseFactory"
import logoImg from "../../assets/logo.png"
import { useBreadcrumbsState } from "../../states/Breadcrumbs"
import useLoginUser from "../../states/LoginUser"
import useNavigator from "../navigator"
import { useToastState } from "../../states/Toast"

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = observer(({ children }) => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const navigator = useNavigator()
  const toastState = useToastState()
  const toast = useToast({
    position: "top-left",
    duration: 3000,
    onCloseComplete: toastState.clear,
    isClosable: true,
  })
  const breadcrumbs = useBreadcrumbsState()
  const loginUser = useLoginUser()
  const membersUseCase = UseCaseFactory.createMembersUseCase()

  const checkIfLoggedIn = async () => {
    const isLoggedIn = await membersUseCase.isLoggedIn()
    if (!isLoggedIn) {
      await handleLogout()
    }
  }

  useEffect(() => {
    checkIfLoggedIn()
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (toastState.message) {
      toast({
        title: toastState.message.getTitle(),
        description: toastState.message.getDescription(),
        status: toastState.message.getStatus(),
      })
    }
  }, [toastState.message])

  const handleLogout = async () => {
    await membersUseCase.logout()
    navigator.toLogin()
  }

  return (
    <VStack spacing={"5px"} h={"100%"} w={"100%"} overflowY={"auto"}>
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
              <MenuGroup key="reporting" title={"Reports"}>
                <MenuItem onClick={navigator.toReports}>Reports</MenuItem>
                <MenuItem onClick={navigator.toTemplates}>Templates</MenuItem>
                <MenuItem isDisabled={true}>Parameters</MenuItem>
                <MenuItem isDisabled={true}>Groups</MenuItem>
                <MenuItem isDisabled={true}>Scheduling</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup key="setting" title={"Settings"}>
                <MenuItem isDisabled={true}>Workspace</MenuItem>
                <MenuItem onClick={navigator.toDataSources}>
                  DataSources
                </MenuItem>
                <MenuItem isDisabled={true}>Logs</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
          <Box>
            <Image
              minW={"250px"}
              onClick={navigator.toTop}
              src={logoImg}
              alt={"logo"}
              margin={"10px"}
              style={{
                transform: "scale(0.8, 0.8)",
                cursor: "pointer",
              }}
            />
          </Box>
          <Box>
            <Select>
              {loginUser.get()?.workspaces.map((w) => {
                return (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                )
              })}
            </Select>
          </Box>
          {breadcrumbs && breadcrumbs.length && (
            <Breadcrumb
              separator={<Icon color="gray.500" as={MdKeyboardArrowRight} />}
            >
              <BreadcrumbItem />
              {breadcrumbs.map((b, idx) => {
                return (
                  <BreadcrumbItem
                    key={b.title}
                    isCurrentPage={breadcrumbs?.length - 1 === idx}
                  >
                    <BreadcrumbLink href={b.path} onClick={b.func}>
                      {b.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )
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
              <MenuItem onClick={navigator.toProfile}>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
      <Box w={"100%"} h={"100%"} padding={"10px"} overflowY={"scroll"}>
        {children}
      </Box>
    </VStack>
  )
})

export default Layout

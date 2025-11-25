import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react"
import {
  VStack,
  HStack,
  Box,
  Menu,
  IconButton,
  Image,
  Icon,
  Breadcrumb,
  NativeSelect,
  Portal,
} from "@chakra-ui/react"
import { FaRegUserCircle } from "react-icons/fa"
import { MdKeyboardArrowRight } from "react-icons/md"
import { CgMenu } from "react-icons/cg"
import UseCaseFactory from "../../../di/UseCaseFactory"
import logoImg from "../../../assets/header-logo.png"
import { useBreadcrumbsState } from "@/infrastructure/state/Breadcrumbs"
import useLoginUser from "../../../infrastructure/state/LoginUser"
import useNavigator from "../navigator"
import { useToastState } from "@/infrastructure/state/Toast"
import { HEADER_HEIGHT } from "../consts"
import { toaster } from "@/components/ui/toaster"

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = observer(({ children }) => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const navigator = useNavigator()
  const toastState = useToastState()
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
      toaster.create({
        title: toastState.message.getTitle(),
        description: toastState.message.getDescription(),
        type: toastState.message.getStatus(),
        meta: { closable: true },
        onStatusChange: (details) => {
          if (details.status === "unmounted") {
            toastState.clear()
          }
        },
      })
    }
  }, [toastState.message])

  const handleLogout = async () => {
    await membersUseCase.logout()
    navigator.toLogin()
  }

  return (
    <VStack gap={0} h="100%" w="100%" overflowY="auto">
      <Box
        h={`${HEADER_HEIGHT}px`}
        w="100%"
        bg="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="0 20px"
        boxShadow="sm"
        borderBottomWidth="1px"
        borderColor="gray.200"
      >
        <HStack gap={"10px"} w={"100%"} h={`${HEADER_HEIGHT}px`}>
          <Box display={"flex"} alignItems={"center"}>
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton
                  variant="subtle"
                  aria-label="Options"
                  css={{ "min-width": "50px !important" }}
                >
                  <CgMenu size="30" />
                </IconButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.ItemGroup title={"Reports"}>
                      <Menu.Item value="reports" onClick={navigator.toReports}>Reports</Menu.Item>
                      <Menu.Item value="templates" onClick={navigator.toTemplates}>Templates</Menu.Item>
                      <Menu.Item value="parameters" disabled>Parameters</Menu.Item>
                      <Menu.Item value="groups" disabled>Groups</Menu.Item>
                      <Menu.Item value="scheduling" disabled>Scheduling</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.Separator />
                    <Menu.ItemGroup title={"Settings"}>
                      <Menu.Item value="workspace" disabled>Workspace</Menu.Item>
                      <Menu.Item value="datasources" onClick={navigator.toDataSources}>
                        DataSources
                      </Menu.Item>
                      <Menu.Item value="logs" disabled>Logs</Menu.Item>
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Box>
              <Image
                w={"150px"}
                onClick={navigator.toTop}
                src={logoImg}
                alt={"logo"}
                style={{
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>
          <Box>
            <NativeSelect.Root>
              <NativeSelect.Field>
                {loginUser.get()?.workspaces.map((w) => {
                  return (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  )
                })}
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Box>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item />
                {breadcrumbs.map((b, idx) => {
                  const isLast = breadcrumbs?.length - 1 === idx
                  return (
                    <React.Fragment key={b.title}>
                      {idx > 0 && (
                        <Breadcrumb.Separator>
                          <Icon color="gray.500" as={MdKeyboardArrowRight} />
                        </Breadcrumb.Separator>
                      )}
                      <Breadcrumb.Item>
                        {isLast ? (
                          <Breadcrumb.CurrentLink>{b.title}</Breadcrumb.CurrentLink>
                        ) : (
                          <Breadcrumb.Link href={b.path} onClick={b.func}>
                            {b.title}
                          </Breadcrumb.Link>
                        )}
                      </Breadcrumb.Item>
                    </React.Fragment>
                  )
                })}
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )}
        </HStack>
        <HStack>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                variant={"icon" as any}
                aria-label="Options"
              >
                <FaRegUserCircle size="30" style={{ color: "gray" }} />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="profile" onClick={navigator.toProfile}>Profile</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item value="logout" onClick={handleLogout}>Logout</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </Box>
      <Box w="100%" h="100%" padding="20px" overflow="auto">
        {children}
      </Box>
    </VStack>
  )
})

export default Layout

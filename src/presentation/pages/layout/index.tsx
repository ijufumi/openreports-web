import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react"
import {
  VStack,
  HStack,
  Box,
  Text,
  Menu,
  IconButton,
  Icon,
  Breadcrumb,
  NativeSelect,
  Portal,
} from "@chakra-ui/react"
import { FaRegUserCircle } from "react-icons/fa"
import { MdKeyboardArrowRight } from "react-icons/md"
import { CgMenu } from "react-icons/cg"
import UseCaseFactory from "../../../di/UseCaseFactory"
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
    <VStack gap={0} h="100%" w="100%" overflowY="auto" bg="nothing.bg">
      <Box
        h={`${HEADER_HEIGHT}px`}
        w="100%"
        bg="nothing.bg"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="24px"
        borderBottomWidth="1px"
        borderColor="nothing.border"
      >
        <HStack gap="20px" h={`${HEADER_HEIGHT}px`} alignItems="center">
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                variant={"icon" as any}
                aria-label="Navigation"
              >
                <CgMenu size="20" />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bg="nothing.surface"
                  borderWidth="1px"
                  borderColor="nothing.border"
                  borderRadius="technical"
                  boxShadow="none"
                  p={2}
                >
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel
                      fontFamily="mono"
                      fontSize="10px"
                      letterSpacing="0.15em"
                      textTransform="uppercase"
                      color="nothing.textSecondary"
                      px={2}
                      py={1}
                    >
                      Reports
                    </Menu.ItemGroupLabel>
                    <Menu.Item value="reports" onClick={navigator.toReports}>
                      Reports
                    </Menu.Item>
                    <Menu.Item
                      value="templates"
                      onClick={navigator.toTemplates}
                    >
                      Templates
                    </Menu.Item>
                    <Menu.Item value="parameters" disabled>
                      Parameters
                    </Menu.Item>
                    <Menu.Item value="groups" disabled>
                      Groups
                    </Menu.Item>
                    <Menu.Item value="scheduling" disabled>
                      Scheduling
                    </Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.Separator borderColor="nothing.border" my={2} />
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel
                      fontFamily="mono"
                      fontSize="10px"
                      letterSpacing="0.15em"
                      textTransform="uppercase"
                      color="nothing.textSecondary"
                      px={2}
                      py={1}
                    >
                      Settings
                    </Menu.ItemGroupLabel>
                    <Menu.Item value="workspace" disabled>
                      Workspace
                    </Menu.Item>
                    <Menu.Item
                      value="datasources"
                      onClick={navigator.toDataSources}
                    >
                      Data Sources
                    </Menu.Item>
                    <Menu.Item value="logs" disabled>
                      Logs
                    </Menu.Item>
                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <HStack
            gap="8px"
            alignItems="baseline"
            onClick={navigator.toTop}
            cursor="pointer"
          >
            <Text
              fontFamily="display"
              fontSize="22px"
              lineHeight="1"
              color="nothing.text"
            >
              ●
            </Text>
            <Text
              fontFamily="mono"
              fontSize="11px"
              letterSpacing="0.25em"
              textTransform="uppercase"
              color="nothing.text"
            >
              OpenReport
            </Text>
          </HStack>
          <Box
            borderLeftWidth="1px"
            borderColor="nothing.border"
            h="32px"
            mx="4px"
          />
          <NativeSelect.Root variant="plain" size="sm" w="auto">
            <NativeSelect.Field
              fontFamily="mono"
              fontSize="12px"
              letterSpacing="0.1em"
              textTransform="uppercase"
              color="nothing.text"
              bg="transparent"
              pr="24px"
            >
              {loginUser.get()?.workspaces.map((w) => {
                return (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                )
              })}
            </NativeSelect.Field>
            <NativeSelect.Indicator color="nothing.textSecondary" />
          </NativeSelect.Root>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb.Root>
              <Breadcrumb.List gap="6px">
                {breadcrumbs.map((b, idx) => {
                  const isLast = breadcrumbs?.length - 1 === idx
                  return (
                    <React.Fragment key={b.title}>
                      {idx > 0 && (
                        <Breadcrumb.Separator>
                          <Icon
                            color="nothing.textDisabled"
                            as={MdKeyboardArrowRight}
                          />
                        </Breadcrumb.Separator>
                      )}
                      <Breadcrumb.Item>
                        {isLast ? (
                          <Breadcrumb.CurrentLink
                            fontFamily="mono"
                            fontSize="12px"
                            letterSpacing="0.1em"
                            textTransform="uppercase"
                            color="nothing.text"
                          >
                            {b.title}
                          </Breadcrumb.CurrentLink>
                        ) : (
                          <Breadcrumb.Link
                            href={b.path}
                            onClick={b.func}
                            fontFamily="mono"
                            fontSize="12px"
                            letterSpacing="0.1em"
                            textTransform="uppercase"
                            color="nothing.textSecondary"
                            textDecoration="none"
                            _hover={{ color: "nothing.text" }}
                          >
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
        <HStack gap="12px">
          <Text
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color="nothing.textDisabled"
          >
            [{loginUser.get()?.name ?? "GUEST"}]
          </Text>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                variant={"icon" as any}
                aria-label="Account"
              >
                <FaRegUserCircle size="18" />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bg="nothing.surface"
                  borderWidth="1px"
                  borderColor="nothing.border"
                  borderRadius="technical"
                  boxShadow="none"
                  p={2}
                >
                  <Menu.Item value="profile" onClick={navigator.toProfile}>
                    Profile
                  </Menu.Item>
                  <Menu.Separator borderColor="nothing.border" my={2} />
                  <Menu.Item value="logout" onClick={handleLogout}>
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </Box>
      <Box w="100%" h="100%" p="40px 48px" overflow="auto">
        {children}
      </Box>
    </VStack>
  )
})

export default Layout

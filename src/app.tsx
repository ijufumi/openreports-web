import React, { FC, ReactNode } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ChakraProvider, Box, Flex, Text } from "@chakra-ui/react"
import { observer } from "mobx-react"

import useLoader from "./infrastructure/state/Loader"
import theme from "./infrastructure/config/theme"
import { Toaster } from "@/components/ui/toaster"
import Layout from "./presentation/pages/layout"
import {
  Path,
  usePublicPath,
  useAuthorizedPath,
  useErrorsPath,
} from "./presentation/pages/paths"

interface LayoutRouteProps {
  children: ReactNode
}

const LayoutRoute: FC<LayoutRouteProps> = ({ children }) => {
  return <Layout>{children}</Layout>
}

interface Props {}

const NothingLoader: FC = () => {
  return (
    <Flex direction="column" alignItems="center" gap="16px">
      <Flex gap="6px">
        {[0, 1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            w="8px"
            h="24px"
            bg="nothing.text"
            css={{
              animation: "nothing-pulse 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </Flex>
      <Text
        fontFamily="mono"
        fontSize="10px"
        letterSpacing="0.25em"
        textTransform="uppercase"
        color="nothing.textSecondary"
      >
        [Loading…]
      </Text>
      <style>{`
        @keyframes nothing-pulse {
          0%, 100% { opacity: 0.2; transform: scaleY(0.6); }
          50%      { opacity: 1;   transform: scaleY(1); }
        }
      `}</style>
    </Flex>
  )
}

const App: FC<Props> = observer(() => {
  const publicPaths = usePublicPath()
  const authorizedPaths = useAuthorizedPath()
  const errorsPaths = useErrorsPath()
  const loader = useLoader()

  const renderRoute = (
    path: string,
    element: ReactNode,
    includeLayout = false
  ) => {
    return (
      <Route
        key={path}
        path={path}
        element={
          includeLayout ? (
            <LayoutRoute key={path}>{element}</LayoutRoute>
          ) : (
            element
          )
        }
      />
    )
  }

  return (
    <ChakraProvider value={theme}>
      <Toaster />
      <Box css={{ position: "relative" }} bg="nothing.bg" minH="100vh">
        {loader.isVisible() && (
          <Flex
            css={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              zIndex: 1000,
              backgroundColor: "rgba(245,243,239,0.85)",
              backdropFilter: "blur(2px)",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <NothingLoader />
          </Flex>
        )}
        <BrowserRouter>
          <Routes>
            {publicPaths.map((path: Path) => {
              return renderRoute(path.path, path.element, false)
            })}
            {errorsPaths.map((path: Path) => {
              return renderRoute(path.path, path.element, false)
            })}
            {authorizedPaths.map((path: Path) => {
              return renderRoute(path.path, path.element, true)
            })}
          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  )
})

export default App

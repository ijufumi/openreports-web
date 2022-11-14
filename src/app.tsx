import React, { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import { Blocks } from "react-loader-spinner";
import { observer } from "mobx-react";

import useLoader from "./states/Loader";
import theme from "./config/theme";
import Layout from "./pages/layout/Layout";
import {
  Path,
  usePublicPath,
  useAuthorizedPath,
  useErrorsPath,
} from "./pages/paths";

interface LayoutRouteProps {
  children: ReactNode;
}

const LayoutRoute: FC<LayoutRouteProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

interface Props {}

const App: FC<Props> = observer(() => {
  const publicPaths = usePublicPath();
  const authorizedPaths = useAuthorizedPath();
  const errorsPaths = useErrorsPath();
  const loader = useLoader();

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
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <Box sx={{ position: "relative" }}>
        <Flex
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            zIndex: 1000,
            display: loader.isVisible() ? "flex" : "none",
          }}
          bgColor="blackAlpha.400"
          alignItems="center"
          justifyContent="center"
        >
          <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        </Flex>
        <BrowserRouter>
          <Routes>
            {publicPaths.map((path: Path) => {
              return renderRoute(path.path, path.element, false);
            })}
            {errorsPaths.map((path: Path) => {
              return renderRoute(path.path, path.element, false);
            })}
            {authorizedPaths.map((path: Path) => {
              return renderRoute(path.path, path.element, true);
            })}
          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
});

export default App;

import React, { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

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

const App: FC<Props> = () => {
  const publicPaths = usePublicPath();
  const authorizedPaths = useAuthorizedPath();
  const errorsPaths = useErrorsPath();

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
    </ChakraProvider>
  );
};

export default App;

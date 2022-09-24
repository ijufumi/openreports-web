import React, { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./config/theme";
import Layout from "./pages/layout/Layout";
import {
  Path,
  PUBLIC_PATHS,
  AUTHORIZED_PATHS,
  ERRORS_PATHS,
} from "./pages/paths";

interface LayoutRouteProps {
  children: any;
}

const LayoutRoute: FC<LayoutRouteProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

interface Props {}

const App: FC<Props> = () => {
  const renderRoute = (
    path: string,
    element: ReactNode,
    includeLayout = false
  ) => {
    return (
      <Route
        key={path}
        path={path}
        element={includeLayout ? <LayoutRoute>{element}</LayoutRoute> : element}
      />
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {PUBLIC_PATHS.map((path: Path) => {
            return renderRoute(path.path, path.element, false);
          })}
          {ERRORS_PATHS.map((path: Path) => {
            return renderRoute(path.path, path.element, false);
          })}
          {AUTHORIZED_PATHS.map((path: Path) => {
            return renderRoute(path.path, path.element, true);
          })}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

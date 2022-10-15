import React, { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./config/theme";
import Layout from "./pages/layout/Layout";
import {
  Path,
  PathWithBreadcrumbs,
  BreadcrumbsProps,
  PUBLIC_PATHS,
  AUTHORIZED_PATHS,
  ERRORS_PATHS,
} from "./pages/paths";

interface LayoutRouteProps {
  children: any;
  breadcrumbs?: Array<any>;
}

const LayoutRoute: FC<LayoutRouteProps> = ({ children, breadcrumbs }) => {
  return <Layout breadcrumbs={breadcrumbs}>{children}</Layout>;
};

interface Props {}

const App: FC<Props> = () => {
  const renderRoute = (
    path: string,
    element: ReactNode,
    includeLayout = false,
    breadcrumbs: Array<BreadcrumbsProps> = []
  ) => {
    return (
      <Route
        key={path}
        path={path}
        element={
          includeLayout ? (
            <LayoutRoute breadcrumbs={breadcrumbs}>{element}</LayoutRoute>
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
          {PUBLIC_PATHS.map((path: Path) => {
            return renderRoute(path.path, path.element, false);
          })}
          {ERRORS_PATHS.map((path: Path) => {
            return renderRoute(path.path, path.element, false);
          })}
          {AUTHORIZED_PATHS.map((path: PathWithBreadcrumbs) => {
            return renderRoute(path.path, path.element, true, path.breadcrumbs);
          })}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

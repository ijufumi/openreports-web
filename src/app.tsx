import React, { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Login from "./pages/login/Login";
import Top from "./pages/top/Top";
import theme from "./config/theme";
import Layout from "./pages/layout/Layout";
import GoogleCallback from "./pages/google_callback/GoogleCallback";
import GoogleAuthError from "./pages/errors/GoogleAuthError";

interface LayoutRouteProps {
  children: any;
}

const LayoutRoute: FC<LayoutRouteProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

interface Path {
  path: string;
  element: ReactNode;
}

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

  const publicPaths: Path[] = [
    {
      path: "/",
      element: <Navigate to={"/login"} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/google/callback",
      element: <GoogleCallback />,
    },
  ];
  const authorizedPaths: Path[] = [
    {
      path: "/top",
      element: <Top />,
    },
  ];
  const errorsPath: Path[] = [
    {
      path: "/error/google",
      element: <GoogleAuthError />,
    },
  ];

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {publicPaths.map((path: Path) => {
            return renderRoute(path.path, path.element, false);
          })}
          {errorsPath.map((path: Path) => {
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

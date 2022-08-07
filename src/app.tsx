import React, { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Login from "./pages/login/Login";
import Top from "./pages/top/Top";
import theme from "./config/theme";
import Layout from "./pages/layout/Layout";
import GoogleCallback from "./pages/google_callback/GoogleCallback";

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
  const renderRoute = (path: string, element: ReactNode) => {
    return <Route path={path} element={<LayoutRoute>{element}</LayoutRoute>} />;
  };

  const publicPaths: Path[] = [
    {
      path: "/",
      element: <Login />,
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

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {publicPaths.map((e: Path) => {
            return renderRoute(e.path, e.element);
          })}
          {authorizedPaths.map((e: Path) => {
            return renderRoute(e.path, e.element);
          })}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

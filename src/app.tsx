import React, { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Login from "./pages/login/login";
import Top from "./pages/top/top";
import theme from "./config/theme";
import Layout from "./pages/layout/layout";

interface AuthorizedRouteProps {
  children: any;
}

const Authorized: FC<AuthorizedRouteProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

interface AuthorizedPath {
  path: string;
  element: ReactNode;
}

interface Props {}

const App: FC<Props> = () => {
  const renderAuthorized = (path: string, element: ReactNode) => {
    return <Route path={path} element={<Authorized>{element}</Authorized>} />;
  };

  const authorizedPaths: AuthorizedPath[] = [
    {
      path: "/top",
      element: <Top />,
    },
  ];

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {authorizedPaths.map((e: AuthorizedPath) => {
            return renderAuthorized(e.path, e.element);
          })}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

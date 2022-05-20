import React, { FC } from "react";
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

interface Props {}

const App: FC<Props> = () => {
  const renderAuthorized = (path: string, element: any) => {
    return <Route path={path} element={<Authorized>{element}</Authorized>} />;
  };

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {renderAuthorized("/top", <Top />)}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

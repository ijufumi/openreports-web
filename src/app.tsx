import React, { FC } from "react";
import { Routes, Route, RouteProps } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Login from "./pages/login/login";
import Top from "./pages/top/top";
import theme from "./config/theme";
import Layout from "./pages/layout/layout";

interface AuthorizedRouteProps extends RouteProps {}

const AuthorizedRoute: FC<AuthorizedRouteProps> = (props) => {
  return (
    <Layout>
      <Routes {...props} />;
    </Layout>
  );
};

interface Props {}

const App: FC<Props> = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <AuthorizedRoute path="/top" element={<Top />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;

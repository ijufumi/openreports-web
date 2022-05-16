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
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/top"
            element={
              <Authorized>
                <Top />
              </Authorized>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

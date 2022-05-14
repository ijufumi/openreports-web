import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Login from "./pages/Login";

import theme from "./config/theme";

interface Props {}

const App: FC<Props> = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;

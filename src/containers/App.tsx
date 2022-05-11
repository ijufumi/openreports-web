import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

import Login from "./Login";

interface Props {

}

const App: FC<Props> = () => {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App;

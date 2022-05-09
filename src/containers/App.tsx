import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from "./Login";

interface Props {

}

const App: FC<Props> = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  )
}

export default App;

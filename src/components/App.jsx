import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

import Top from './Top'

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Top}/>
        </div>
    </BrowserRouter>
);

export default App

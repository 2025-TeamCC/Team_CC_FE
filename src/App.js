import React from 'react';
import MyRoutes from './util/MyRoutes';
import {BrowserRouter} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <MyRoutes/>
    </BrowserRouter>
  );
}

export default App;

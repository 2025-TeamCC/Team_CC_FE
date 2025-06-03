import MyRoutes from './util/MyRoutes';
import {BrowserRouter} from "react-router-dom";
import theme from './util/theme';
import { ThemeProvider } from 'styled-components';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MyRoutes/>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

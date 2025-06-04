import React from 'react';
import MyRoutes from './util/MyRoutes';
import {BrowserRouter} from "react-router-dom";
import theme from './util/theme';
import {ThemeProvider} from 'styled-components';
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <MyRoutes/>
                </ThemeProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;

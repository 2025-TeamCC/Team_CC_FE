import React from 'react';
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import Footer from "./Components/Footer"

function Layout() {
    return (
        <BaseContainer>
            <MainContent>
                <Outlet />
            </MainContent>
            <Footer />
        </BaseContainer>
    )
}

const BaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin : 0 auto;
    width: 100%;
    max-width: ${({ theme }) => theme.maxWidth};
    background-color: ${({ theme }) => theme.bgcolors.white};;
`
const MainContent = styled.div`
    width: 100%;
`;


export default Layout
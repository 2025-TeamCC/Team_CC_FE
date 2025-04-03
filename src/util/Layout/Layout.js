import { Outlet } from "react-router-dom"
import styled from "styled-components"
import Header from "./Components/Header"
import Footer from "./Components/Footer"

function Layout() {
    return (
        <BaseContainer>
            <Header />
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
    min-height: 100vh;
    width: 100%;
    background-color: #f0f0f0;
    padding: 0;
    margin: 0;
`
const MainContent = styled.div`

`;


export default Layout
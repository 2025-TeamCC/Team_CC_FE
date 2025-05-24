import styled from "styled-components"

function Footer() {
    return (
        <FooterContainer>
            Footer
            <p>&copy; 2023 My Company</p>
            <p>All rights reserved.</p>
        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    width: 100%;
    height : 100px;
    background-color: #333;
`

export default Footer
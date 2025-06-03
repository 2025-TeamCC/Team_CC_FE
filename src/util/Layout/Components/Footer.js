import React from 'react';
import styled from "styled-components"
import { Container } from '../../Container';

function Footer() {
    return (
        <FooterContainer>
            Footer
            <p>&copy; 2023 My Company</p>
            <p>All rights reserved.</p>
        </FooterContainer>
    )
}

const FooterContainer = styled(Container)`
    height : 100px;
    background-color: #333;
`

export default Footer
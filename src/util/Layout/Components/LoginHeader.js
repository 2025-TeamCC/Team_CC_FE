import React from 'react';
import styled from "styled-components";
import { RowContainer } from '../../Container';
import GoogleLoginButton from '../../GoogleLoginButton';

function LoginHeader() {
    return (
        <LoginHeaderRowContainer>
            <LogoImage src="/Img/logo.png" alt="Logo" />
            <GoogleLoginButton/>
        </LoginHeaderRowContainer>
    )
}
export default LoginHeader;

const LoginHeaderRowContainer = styled(RowContainer)`
    justify-content: space-between;
    align-items: center;
`;
const LogoImage = styled.img`
    height: 40px;
`;
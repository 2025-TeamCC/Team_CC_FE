import React from 'react';
import styled from "styled-components";

function LoginHeader() {
    return (
        <div>
            <LogoImage src = "" alt = "Logo"/>
        </div>
    )
}
export default LoginHeader;

const LogoImage = styled.img`
    width: 85px;
    height: 30px;
    border : 1px solid black;
`;

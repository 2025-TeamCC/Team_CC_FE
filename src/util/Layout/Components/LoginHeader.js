import { RowContainer } from "../../Container";
import styled from "styled-components";

function LoginHeader() {
    return (
        <RowContainer>
            <LogoImage src = "" alt = "Logo"/>
        </RowContainer>
    )
}
export default LoginHeader;

const LogoImage = styled.img`
    width: 85px;
    height: 30px;
    border : 1px solid black;
`;

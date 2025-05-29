import styled from "styled-components"
import { Container } from "../../Container"
import LoginHeader from "./LoginHeader";

function Header({desc}) {
    return (
        <HeaderContainer>
            {
                desc
                    ? <Desc>{desc}</Desc>
                    : <LoginHeader>
                        
                    </LoginHeader>
            }
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled(Container)`
    background-color: #F4F4F4;
    height : 130px
`;

const Desc = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.medium};
`;
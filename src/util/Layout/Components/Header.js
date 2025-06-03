import React from 'react';
import PropTypes from 'prop-types'; 
import styled from "styled-components"
import { Container } from "../../Container"
import LoginHeader from "./LoginHeader";

function Header({desc}) {
    return (
        <HeaderContainer>
            {
                desc
                    ? <Desc>{desc}</Desc>
                    : <LoginHeader/>
            }
        </HeaderContainer>
    )
}

export default Header

Header.propTypes = {
    desc: PropTypes.string
};

const HeaderContainer = styled(Container)`
    background-color:${({ theme }) => theme.bgcolors.gray};
    height : 100px;
    display : flex;
    flex-direction: column;
    justify-content: end;
    padding-bottom: 10px;
`;

const Desc = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
`;
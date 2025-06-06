import React from 'react';
import PropTypes from 'prop-types'; 
import styled from "styled-components"
import { Container } from "../../Container"
import LoginHeader from "./LoginHeader";
import { useLocation, useNavigate } from 'react-router-dom';

function Header({ desc }) {
    
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <HeaderContainer>
            {
                desc
                    ? location?.pathname === "/eventlist" || location?.pathname === "/event/create" || location?.pathname === "/event/attend"
                        ? <Desc> {desc}</Desc>
                        :
                            <div>
                                <BackButton onClick={() => navigate("/eventlist")}>← 홈으로 가기</BackButton>
                                <Desc> {desc}</Desc>
                            </div>
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

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: gray;
  margin-top: 10px;
  margin-left: 0;
  display: block;
  text-align: left;
  cursor: pointer;

  margin-bottom: 10px;
`;
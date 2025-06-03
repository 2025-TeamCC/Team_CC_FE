import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function ButtonList() {
    return (
        <ButtonListContainer>
            <CreateButton to = "/event/create">
                <p>생성</p>
                <ButtonImage src = "Img/Button/create.png" alt = "create image"/>
            </CreateButton>
            <AttendButton to = "/event/attend">
                <p>참여</p>
                <ButtonImage src = "Img/Button/attend.png" alt = "attend image"/>
            </AttendButton>
        </ButtonListContainer>
    )
}

const ButtonListContainer = styled.div`
    width: 100%;
    display: flex;
    padding : 10px 0px;
`

const Button = styled(Link)`
    width: 70px;
    height : 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border : none;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: bold;

    &:hover{
        opacity: 0.5;
    }

`
const CreateButton = styled(Button)`
    background-color: ${({ theme }) => theme.bgcolors.primary};
    color: ${({ theme }) => theme.colors.white};

    margin-right: 10px
`;

const AttendButton = styled(Button)`
    background-color: ${({ theme }) => theme.bgcolors.boldGray};
    color: ${({ theme }) => theme.colors.black};
`

const ButtonImage = styled.img`
    width: 20px;
    height : 20px;
    margin-left: 5px;
`;
export default ButtonList;
import React from "react";
import {RowContainer} from "../../../util/Container";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

function BackPage() {
    const navigate = useNavigate();

    const handleBack = (e) => {
        e.preventDefault();
        const confirmBack = window.confirm("이동하시겠어요?\n\n(유의사항 : 이동 시, 초기화됩니다.)");
        if (confirmBack) {
            navigate("/eventlist");
        }
    };

    return (
        <BackPageRowContainer>
            <BackPageLink as="a" href="/eventlist" onClick={handleBack}>
                <BackImage src="/Img/back.png" alt="back img"/>
                <BackText>뒤로가기</BackText>
            </BackPageLink>
        </BackPageRowContainer>
    );
}

const BackPageRowContainer = styled(RowContainer)`
    align-items: center;
    padding: 20px 0px;
`;

const BackPageLink = styled.a `
    display: flex;
    cursor: pointer;
`;

const BackImage = styled.img `
    width: 20px;
    height: 20px;
    margin-right: 5px;
`;

const BackText = styled.p `
    color: ${ ({theme}) => theme.colors.boldGray};
    font-size: ${ ({theme}) => theme.fontSizes.sm};
    font-weight: bold;
`;

export default BackPage;

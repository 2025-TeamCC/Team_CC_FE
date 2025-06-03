import React from "react";
import PropTypes from "prop-types";
import {RowContainer} from "../../../util/Container";
import styled from "styled-components";

function BackPage({openModal}) {
    const handleClick = (e) => {
        e.preventDefault();
        openModal();
    };

    return (
        <BackPageRowContainer>
            <BackPageLink as="a" href="/eventlist" onClick={handleClick}>
                <BackImage src="/Img/back.png" alt="back img"/>
                <BackText>뒤로가기</BackText>
            </BackPageLink>
        </BackPageRowContainer>
    );
}

BackPage.propTypes = {
    openModal: PropTypes.func.isRequired
};

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
    color: ${ ({
    theme}) => theme.colors.boldGray};
    font-size: ${ ({
        theme}) => theme.fontSizes.sm};
    font-weight: bold;
`;

        export default BackPage;

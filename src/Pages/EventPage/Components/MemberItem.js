import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { HR } from "../../../util/HR";

function MemberItem({member}) {
    return (
        <>
            <MemberItemContainer>
                    <UserImage src={`${member.gender ? "/Img/Gender/man.png" : "/Img/Gender/woman.png"}`} alt="user image" />
                    <UserInfoContainer>
                        <UserName>{member.name}</UserName>
                        <UserInfoRow>
                            <UserTag># {member.gender ? "남자" : "여자"}</UserTag>
                            <UserTag>{member.isSaeSae && "# 새새" }</UserTag>
                        </UserInfoRow>
                    </UserInfoContainer>
            </MemberItemContainer>
            <HR/>
        </>
    )
}

MemberItem.propTypes = {
    member : PropTypes.object.isRequired
}

const MemberItemContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding : 20px 0px;
`;

const UserImage = styled.img`
    width: 30px;
    height : 30px;
    border : 1px solid black;
    border-radius: 50px;
    margin-right: 10px;
`;

const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column
`;

const UserName = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: bold;
`;

const UserInfoRow = styled.div`
    display: flex;
`;

const UserTag = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color : ${({ theme }) => theme.colors.primary};
    margin-right: 10px;
`;

export default MemberItem;

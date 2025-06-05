import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { HR } from "../../../util/HR";
import ConfirmModal from "../../../util/modal/ConfirmModal";
import AlertModal from "../../../util/modal/AlertModal";

function MemberItem({ member, owner }) {
    
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [isModalCheck, setIsModalCheck] = useState(false);
    return (
        <>
            <MemberItemContainer>
                    <UserImage src={`${member.gender ? "/Img/Gender/man.png" : "/Img/Gender/woman.png"}`} alt="user image" />
                    <UserInfoRowContainer>
                        <UserInfoContainer>
                            <UserName>{member.name}</UserName>
                            <UserInfoRow>
                                <UserTag># {member.gender ? "남자" : "여자"}</UserTag>
                                <UserTag>{member.isSaeSae && "# 새새" }</UserTag>
                            </UserInfoRow>
                        </UserInfoContainer>
                        {
                            owner === true && <DeleteButton onClick={() => setIsModalDelete(true)}>삭제</DeleteButton>
                        }
                    </UserInfoRowContainer>
            </MemberItemContainer>
            <HR />
            {
                isModalDelete && <ConfirmModal
                    title={`${member.name}님을 삭제하시겠습니까?`}
                        desc="삭제 후에는 재초대를 진행해야 합니다."
                        onCancel={() => setIsModalDelete(false)}
                        onConfirm={() => {
                            // 사용자를 event에서 퇴출하는 로직 추가하기
                            setIsModalDelete(false);
                            setIsModalCheck(true);
                        }}
                    />
            }
            {
                isModalCheck && <AlertModal
                    title="삭제 완료"
                    desc="정상적으로 삭제되었습니다!"
                    onClose={() => {    
                        setIsModalCheck(false);
                        // Safari 대응 위해 약간 지연 후 스크롤
                        setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }, 0);
                    }}
                />
            }
        </>
    )
}

MemberItem.propTypes = {
    member: PropTypes.object.isRequired,
    owner : PropTypes.bool.isRequired
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

const UserInfoRowContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const DeleteButton = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color : ${({ theme }) => theme.colors.pink};
    font-weight: 600;

    transition: opacity 0.3s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.5;
        }
    }
`;

export default MemberItem;
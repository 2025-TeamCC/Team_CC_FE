import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { putSelectMember } from "../../../API/Event";
import { useParams } from "react-router-dom";

function PairingModal({ onClose }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matchedUser, setMatchedUser] = useState("");

  const { eventId } = useParams();

  const handleSelect = async () => {
    setIsLoading(true);
    const response = await putSelectMember(eventId);
    console.log(response.user2);
    setMatchedUser(response.user2);
    setIsLoading(false);
    window.location.reload();
  };

  if (matchedUser) {
    return (
      <ModalOverlay>
        <ModalContent>
          <h3>🎉 당신의 짝궁은 바로,</h3>
          <ResultName>{matchedUser}님입니다!</ResultName>
          <CloseBtn onClick={onClose}>닫기</CloseBtn>
        </ModalContent>
      </ModalOverlay>
    );
  }

  if (isLoading) {
    return (
      <ModalOverlay>
        <ModalContent>
          <p>📩 매칭 결과 도착 중…</p>
          <p>과연 당신의 짝꿍은…?!</p>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <h4>아래의 카드 중 하나를 뽑아주세요!</h4>
        <CardGrid>
          {[...Array(9)].map((_, i) => (
            <CardImg
              key={i}
              src={
                selectedIndex === i
                  ? "/Img/Gender/man_selected.png"
                  : "/Img/Gender/man.png"
              }
              onClick={() => setSelectedIndex(i)}
              $selected={selectedIndex === i}
            />
          ))}
        </CardGrid>
        <SelectBtn disabled={selectedIndex === null} onClick={handleSelect}>
          선택하기
        </SelectBtn>
      </ModalContent>
    </ModalOverlay>
  );
}

PairingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PairingModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  width: 90%;
  max-width: 360px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 20px 0;
`;

const CardImg = styled.img`
  width: 80px;
  height: 100px;
  border-radius: 10px;
  border: ${({ $selected }) =>
    $selected ? "2px solid blue" : "1px solid #ccc"};
  cursor: pointer;
`;

const SelectBtn = styled.button`
  background: ${({ theme }) => theme.bgcolors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ResultName = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin: 16px 0;
`;

const CloseBtn = styled(SelectBtn)`
  margin-top: 16px;
`;

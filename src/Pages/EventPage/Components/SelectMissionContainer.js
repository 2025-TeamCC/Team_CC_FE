import React from "react";
import styled from "styled-components";

function SelectMissionContainer() {
    return (
        <Overlay>
            <Modal>
                <Title>미션을 선택해주세요!</Title>
                <ContentArea>
                    <SectionTitle color="#3B3BFF">10점 미션</SectionTitle>
                    <ul>
                        <li><input type="checkbox" checked="checked" readOnly="readOnly"/>
                            같이 점심 먹기</li>
                        <li><input type="checkbox" checked="checked" readOnly="readOnly"/>
                            시간표 공유하기</li>
                        <li><input type="checkbox" checked="checked" readOnly="readOnly"/>
                            서로 이름으로 삼행시 적어주기</li>
                        <li><input type="checkbox" readOnly="readOnly"/>
                            한한하기</li>
                        {/* ... */}
                    </ul>
                    <SectionTitle color="#3B3BFF">30점 미션</SectionTitle>
                    <ul>
                        <li><input type="checkbox" checked="checked" readOnly="readOnly"/>
                            인생네컷 찍기</li>
                        <li><input type="checkbox" checked="checked" readOnly="readOnly"/>
                            서로 손편지 써주기</li>
                        {/* ... */}
                    </ul>
                </ContentArea>
                <NextButton disabled="disabled">다음</NextButton>
            </Modal>
        </Overlay>
    );
}

export default SelectMissionContainer;

const Overlay = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 어두운 오버레이
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div `
  background-color: white;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2 `
  text-align: center;
  font-size: 18px;
  color: #3b3bff;
  margin-bottom: 16px;
`;

const ContentArea = styled.div `
  overflow-y: auto;
  flex: 1;
  margin-bottom: 16px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 16px 0;

    li {
      margin-bottom: 8px;
      font-size: 14px;
    }
  }
`;

const SectionTitle = styled.div `
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
  color: ${ (
    props
) => props.color || "black"};
`;

const NextButton = styled.button `
  background-color: #dcdcdc;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  cursor: not-allowed;
  width: 100%;
`;

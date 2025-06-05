import React from "react";
import styled from "styled-components";
import { Container } from "../../../util/Container";
import { confirmedMissionData } from "../../../data/confirmedMissionData";

function MissionConfirmedPage() {
  const { selectedMissionId, paringId, score, title, date, imagePath } =
    confirmedMissionData;

  return (
    <div>
      <Container>
        <TopRow>
          <BackButton>← 뒤로가기</BackButton>
          <SuccessText>
            미션 성공! <Dot />
          </SuccessText>
        </TopRow>

        <Label>미션명</Label>
        <Title>
          {score}점 | {title}
        </Title>

        <Divider />

        <Date>{date}</Date>

        <ImagePreview src={imagePath} alt="제출 이미지" />
      </Container>
    </div>
  );
}

export default MissionConfirmedPage;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: gray;
  font-size: 14px;
  cursor: pointer;
`;

const SuccessText = styled.div`
  color: #2688eb;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const Dot = styled.span`
  display: inline-block;
  margin-left: 6px;
  width: 8px;
  height: 8px;
  background-color: #2688eb;
  border-radius: 50%;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 8px 0 20px;
`;

const Divider = styled.hr`
  margin: 24px 0;
  border: none;
  border-top: 1px solid #ddd;
`;

const Date = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 12px;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 100%;
  border-radius: 10px;
`;

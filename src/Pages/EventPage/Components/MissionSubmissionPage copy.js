import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "../../../util/Container";
import { missionListGetData } from "../../../data/missionList";
import successImg from "../../../Assets/ix_success.png";

function MissionSubmissionPage({ missionId, goBack }) {
  const mission = missionListGetData.missions.find(
    (m) => m.selectedMissionId === missionId
  );

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size < 10 * 1024 * 1024) {
      setFile(selected);
      setFileName(selected.name);
    } else {
      alert("10MB 이하 파일만 업로드 가능합니다.");
    }
  };

  const handleSubmit = () => {
    setTimeout(() => {
      mission.isSubmit = true;
      setShowConfirm(false);
      setShowSuccess(true);
    }, 1000);
  };

  return (
    <div>
      <Container>
        <BackButton onClick={goBack}>← 뒤로가기</BackButton>

        <Label>미션명</Label>
        <Title>
          {mission.score}점 | {mission.title}
        </Title>

        <Instruction>
          미션 수행을 인증할 사진을 첨부해주세요!
          <br />
          <Note>* JPG, PNG 형식만 가능 / 10MB 이하</Note>
        </Instruction>

        <FileUpload>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <FileName>{fileName}</FileName>
        </FileUpload>

        <SubmitWrapper>
          <SubmitBtn disabled={!file} onClick={() => setShowConfirm(true)}>
            제출하기
          </SubmitBtn>
        </SubmitWrapper>

        {showConfirm && (
          <Modal>
            <ModalContent>
              <p>미션을 제출하시겠습니까?</p>
              <BtnRow>
                <Cancel onClick={() => setShowConfirm(false)}>아니요</Cancel>
                <Confirm onClick={handleSubmit}>예</Confirm>
              </BtnRow>
            </ModalContent>
          </Modal>
        )}

        {showSuccess && (
          <Modal>
            <ModalContent>
              <SuccessImage src={successImg} alt="성공" />
              <p>미션이 제출되었습니다!</p>
              <Confirm onClick={goBack}>닫기</Confirm>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </div>
  );
}

MissionSubmissionPage.propTypes = {
  missionId: PropTypes.number.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default MissionSubmissionPage;

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
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  margin-top: 20px;
`;

const Title = styled.h2`
  margin: 8px 0 20px;
`;

const Instruction = styled.p`
  font-weight: 500;
`;

const Note = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
`;

const FileUpload = styled.div`
  margin-top: 20px;
`;

const FileName = styled.div`
  font-size: 14px;
  margin-top: 5px;
  color: gray;
`;

const SubmitWrapper = styled.div`
  margin-top: 30px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 15px 0;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#5555ff")};
  color: white;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px 20px;
  border-radius: 16px;
  text-align: center;
  min-width: 260px;
`;

const BtnRow = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

const Cancel = styled.button`
  background: #ddd;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
`;

const Confirm = styled.button`
  background: #5555ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
`;

const SuccessImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`;

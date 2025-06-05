import React, { useState } from "react";
import styled from "styled-components";
import { missionTemplate } from "../../../data/missionTemplate";
import { useParams } from "react-router-dom";
import ConfirmModal from "../../../util/modal/ConfirmModal";
import { postSelectMissionListAPI } from "../../../API/Event";
import AlertModal from "../../../util/modal/AlertModal";

function SelectMissionContainer() {
  const [selectMissionInfo, setSelectMissionInfo] = useState([]);
  const [selectMissionInfoDetail, setSelectMissionInfoDetail] = useState([]);
  const [isSelect, setIsSelect] = useState(false);
  
  const { eventId } = useParams();

  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalCheck, setIsModalCheck] = useState(false);

  // 여러 번 호출 방지용
  const [isSubmitting, setIsSubmitting] = useState(false);



  const handleAddMission = (mission_id) => {
    setSelectMissionInfo((prev) => {
      if (prev.includes(mission_id)) {
        return prev.filter((id) => id !== mission_id);
      } else {
        return [...prev, mission_id];
      }
    });
  
    setSelectMissionInfoDetail((prev) => {
      const allMissions = missionTemplate.flatMap((group) => group.missions);
      const mission = allMissions.find((m) => m.mission_id === mission_id);
      if (!mission) return prev;
  
      const alreadyExists = prev.find((m) => m.mission_id === mission_id);
      if (alreadyExists) {
        return prev.filter((m) => m.mission_id !== mission_id);
      } else {
        return [...prev, mission];
      }
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // 중복 실행 방지
    setIsSubmitting(true);
    try {
      await postSelectMissionListAPI(eventId, selectMissionInfo);
      setIsModalCheck(true);
    } catch (e) {
      console.error("미션 생성 실패:", e);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const isNextDisabled = selectMissionInfo.length === 0;

  return (
      <Overlay>
          {
            isSelect === false 
              ?
                <Modal>
                      <Title>미션을 선택해주세요!</Title>
                      <ContentArea>
                          {missionTemplate?.map((missions, index) => (
                              <div key={index}>
                                  <SectionTitle color="#3B3BFF">{`${missions.score}점 미션`}</SectionTitle>
                                  {missions.missions?.map((mission, index2) => (
                                      <Mission key={index2}>
                                          <input
                                              type="checkbox"
                                              value={mission.title}
                                              id={`mission-${mission.mission_id}`}
                                              onChange={() => handleAddMission(mission.mission_id)}
                                              checked={selectMissionInfo.includes(mission.mission_id)}
                                          />
                                          <label htmlFor={`mission-${mission.mission_id}`}> {mission.title}</label>
                                      </Mission>
                                  ))}
                              </div>
                          ))}
                      </ContentArea>
                      <NextButton disabled={isNextDisabled} active={!isNextDisabled} onClick={() => setIsSelect(true)}>
                          다음
                      </NextButton>
                      
                </Modal>
              :
                <Modal>
                      <Title>미션을 선택해주세요!</Title>
                      <ContentArea>
                        {
                          // 점수 기준으로 그룹화
                          Array.from(
                            selectMissionInfoDetail.reduce((acc, mission) => {
                              if (!acc.has(mission.score)) {
                                acc.set(mission.score, []);
                              }
                              acc.get(mission.score).push(mission);
                              return acc;
                            }, new Map())
                          ).map(([score, missions], index) => (
                            <div key={index}>
                              <SectionTitle color="#3B3BFF">{`${score}점 미션`}</SectionTitle>
                              {
                                missions.map((mission, idx) => (
                                  <Mission key={idx}>
                                    <input
                                      type="checkbox"
                                      value={mission.title}
                                      id={`mission-${mission.mission_id}`}
                                      onChange={() => handleAddMission(mission.mission_id)}
                                      checked={selectMissionInfo.includes(mission.mission_id)}
                                    />
                                    <label htmlFor={`mission-${mission.mission_id}`}> {mission.title}</label>
                                  </Mission>
                                ))
                              }
                            </div>
                          ))
                        }
                      </ContentArea>
                      <ButtonRow>
                        <NextButton disabled={isNextDisabled} active={!isNextDisabled} onClick={() => setIsSelect(false)}>
                            이전
                        </NextButton>
                        <CreateButton disabled={isNextDisabled} active={!isNextDisabled} onClick={() => setIsModalCreate(true)}>
                            생성
                        </CreateButton>
                      </ButtonRow>
                      
                </Modal>
          }
          {
            isModalCreate && <ConfirmModal
              title="생성 하시겠습니까?"
              desc="선택 후 미션 변경은 불가능합니다."
              onCancel={() => setIsModalCreate(false)}
              onConfirm={() => {
                setIsModalCreate(false);
                handleSubmit();
              }}
          />
          }
          {
            isModalCheck && <AlertModal
                title = "미션 생성 완료"
                desc="미션이 생성되었습니다!"
                onClose={() => {    
                    setIsModalCheck(false);
                    setIsSelect(false);
                    window.location.reload();
                }}
            />
          }
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
  width: 80%;
  max-width: 400px;
  max-height: 500px;
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
  font-size: ${({ theme }) => theme.fontSizes.lg};
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

const SectionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
  color: ${ (
    props
) => props.color || "black"};
`;

const NextButton = styled.button`
  background-color: ${({ active }) => (active ? "#3b3bff" : "#dcdcdc")};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
  width: 100%;
  transition: 0.2s;

  transition: opacity 0.3s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.5;
        }
    }
`;

const CreateButton = styled(NextButton)`
  background-color: ${({ active, theme }) => (active ? theme.bgcolors.black : "#dcdcdc")};
`

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  gap : 5px;
`;


const Mission = styled.div`
  margin-bottom: 5px;
`;
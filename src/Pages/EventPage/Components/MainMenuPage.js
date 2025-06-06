import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../../util/Container";
import PropTypes from "prop-types";
import StepProgressBar from "./StepProgressBar";
import SelectMissionContainer from "./SelectMissionContainer";
import PairingModal from "./PairingModal.js";
import { getIsSelectMember, getRank, postStartMatching } from "../../../API/Event.js";
import { useParams } from "react-router-dom";

function MainMenuPage({ owner, isMissionSelected,isPaired, isSelected }) {
  const [sortedRank, setSortedRank] = useState([]);
  const top3Raw = sortedRank.slice(0, 3);
  let top3 = [];
  
  if (top3Raw.length === 1) {
    top3 = [null, top3Raw[0], null];
  } else if (top3Raw.length === 2) {
    top3 = [top3Raw[1], top3Raw[0], null];
  } else {
    top3 = [top3Raw[1], top3Raw[0], top3Raw[2]];
  }
  
  const others = sortedRank.slice(3);
  const [left, center, right] = top3;

  const [isModalSelectMission, setIsModalSelectMission] = useState(false);
  const [isPairingModalOpen, setIsPairingModalOpen] = useState(false);

  const { eventId } = useParams();
  const handleStartMatching = async () => {
    await postStartMatching(eventId);
    window.location.reload();
  }

  // const [isSelectMember, setIsSelectMember] = useState(false);

  useEffect(() => {
    if (isPaired === 'ING') {
      getIsSelectMember(eventId);
    } else if (isPaired === "DONE") {
      getRank(eventId).then((response) => {
        const originalRank = response?.rank || [];
        setSortedRank(originalRank);
      });
    }
  }, [isPaired]);

  const handleCompleteSelectMember = () => {
    setIsPairingModalOpen(false);
    window.location.reload();
  }

  return (
    <div>
      {owner && isPaired === "NOT" ? (
        <Container>
          <StepProgressBar currentStep={isMissionSelected ? 2 : 1} />
          <WelcomeContainer>
            <Img src="/Img/welcome.png" alt="welcome png" />
            <WelcomeLabel>{`아직 시작 전이에요!\n팀원들이 참여하고 있어요`}</WelcomeLabel>
          </WelcomeContainer>

          {isMissionSelected === false && (
            <CreateButton onClick={() => setIsModalSelectMission(true)}>
              미션 생성하기
            </CreateButton>
          )}
          {isMissionSelected === true && (
            <PairButton onClick={() => handleStartMatching()}>
              짝 매칭하기
            </PairButton>
          )}

          {isMissionSelected === false && isModalSelectMission && (
            <SelectMissionContainer />
          )}
        </Container>
      ) : (
        <Container>
          {
            isPaired === 'DONE' ? (
              <>
                <Top3Container>
                  {[left, center, right].map((pair, index) => {
                    const isFirst = index === 1;
                    const medalSrc =
                      index === 1 ? "/Img/Medal/gold.png"
                      : index === 0 ? "/Img/Medal/silver.png"
                      : "/Img/Medal/bronze.png";

                    return (
                      <TopCard key={index} $isFirst={isFirst}>
                        <MedalWrapper>
                          <Medal src={medalSrc} $isFirst={isFirst} />
                        </MedalWrapper>
                        <CharImage
                          src="/Img/Gender/man.png"
                          $isFirst={isFirst}
                          style={{ opacity: pair ? 1 : 0.2 }}
                        />
                        <PairName $isFirst={isFirst}>
                          {pair ? `${pair.user1Name} ${pair.user2Name}` : ""}
                        </PairName>
                        <ScoreText $isFirst={isFirst}>
                          {pair ? `${pair.score}점` : ""}
                        </ScoreText>
                      </TopCard>
                    );
                  })}
                </Top3Container>

                {isModalSelectMission && <SelectMissionContainer />}

                {others.map((pair, index) => (
                  <ListItem key={pair?.pairId}>
                    <Left>
                      <CharImageSmall src="/Img/Gender/man.png" />
                      <RankText>{index + 4}th</RankText>
                      <NameGroup>
                        <Name>{pair?.user1Name}</Name>
                        <Name>{pair?.user2Name}</Name>
                      </NameGroup>
                    </Left>
                    <Right>{pair?.score}점</Right>
                  </ListItem>
                ))}
              </>
              ) : isPaired === 'ING' ? (
                isSelected === false ? 
                  <WelcomeContainer member = "true">
                    <Img src="/Img/welcome.png" alt="welcome png" />
                    <WelcomeLabel>{`매칭이 시작됐어요!\n카드를 뽑아주세요!`}</WelcomeLabel>
                    <MatchingStartButton onClick={() => setIsPairingModalOpen(true)}>뽑으러 가기</MatchingStartButton>
                  </WelcomeContainer>
                  : 
                  <WelcomeContainer member = "true">
                    <Img src="/Img/welcome.png" alt="welcome png" />
                    <WelcomeLabel>{`매칭이 시작됐어요!\n전체 매칭을 기다려주세요!`}</WelcomeLabel>
                </WelcomeContainer>
              ) : (
                <WelcomeContainer member = "true">
                  <Img src="/Img/welcome.png" alt="welcome png" />
                  <WelcomeLabel>{`아직 시작 전이에요!\n팀원들이 참여하고 있어요`}</WelcomeLabel>
              </WelcomeContainer>
              )
          }
        </Container>
      )}
      {isPairingModalOpen && (
        <PairingModal onClose={() => handleCompleteSelectMember()} />
      )}
    </div>
  );
}

MainMenuPage.propTypes = {
  owner: PropTypes.bool.isRequired,
  isMissionSelected: PropTypes.bool.isRequired,
  isPaired: PropTypes.bool.isRequired,
  isSelected:PropTypes.bool.isRequired,
};

export default MainMenuPage;

const WelcomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({member}) => member ? "120px" : "30px"};
`;

const Img = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;

const WelcomeLabel = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  white-space: pre-line;
  text-align: center;
  line-height: 2;
`;

const CreateButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
  margin-top: 40px;
  border: none;
  background-color: ${({ theme }) => theme.bgcolors.primary};
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease-in-out;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.5;
    }
  }
`;

const PairButton = styled(CreateButton)`
  margin-top: 12px;
`;

const Top3Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const TopCard = styled.div`
  background: #333;
  border-radius: 16px;
  padding: 10px;
  width: ${({ $isFirst }) => ($isFirst ? "124px" : "90px")};
  text-align: center;
  color: white;
  position: relative;
  padding-top: 35px;
  height: ${({ $isFirst }) => ($isFirst ? "140px" : "110px")};
`;

const MedalWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Medal = styled.img`
  width: ${({ $isFirst }) => ($isFirst ? "36px" : "28px")};
  height: ${({ $isFirst }) => ($isFirst ? "36px" : "28px")};
`;

const CharImage = styled.img`
  width: ${({ $isFirst }) => ($isFirst ? "60px" : "50px")};
  height: ${({ $isFirst }) => ($isFirst ? "60px" : "50px")};
  margin: 8px 0;
`;

const PairName = styled.div`
  font-size: ${({ $isFirst }) => ($isFirst ? "16px" : "14px")};
`;

const ScoreText = styled.div`
  font-size: ${({ $isFirst }) => ($isFirst ? "15px" : "13px")};
  color: gold;
  margin-top: 4px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const CharImageSmall = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

const RankText = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const NameGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const Name = styled.div`
  font-size: 14px;
  margin-right: 5px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Right = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #f2c94c;
`;

const MatchingStartButton = styled.button`
  background-color: ${({ theme }) => theme.bgcolors.primary};
  color : ${({ theme }) => theme.colors.white};
  border : none;
  border-radius: 5px;
  padding : 5px 10px;
  margin-top: 30px;
  font-weight: bold;

  transition: all 0.3s ease-in-out;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.5;
    }
  }
`;
import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../../../util/Container";
import { scoreListGetData } from "../../../data/scoreList";
import PropTypes from "prop-types";
import StepProgressBar from "./StepProgressBar";
import SelectMissionContainer from "./SelectMissionContainer";

// 👇 새로 추가된 컴포넌트
function PairingModal({ onClose }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matchedUser, setMatchedUser] = useState("");

  const handleSelect = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setMatchedUser("김광일");
    setIsLoading(false);
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

// 👇 Main 컴포넌트
function MainMenuPage({ owner }) {
  const sortedRank = [...(scoreListGetData?.rank || [])].sort(
    (a, b) => b.score - a.score
  );
  const top3 = sortedRank.slice(0, 3);
  const others = sortedRank.slice(3);
  const [second, first, third] = top3;

  const [isModalSelectMission, setIsModalSelectMission] = useState(false);
  const [isPairingModalOpen, setIsPairingModalOpen] = useState(false);

  return (
    <div>
      {owner ? (
        <Container>
          <StepProgressBar currentStep={1} />
          <WelcomeContainer>
            <Img src="/Img/welcome.png" alt="welcome png" />
            <WelcomeLabel>{`아직 시작 전이에요!\n팀원들이 참여하고 있어요`}</WelcomeLabel>
          </WelcomeContainer>
          <CreateButton onClick={() => setIsModalSelectMission(true)}>
            미션 생성하기
          </CreateButton>
          <PairButton onClick={() => setIsPairingModalOpen(true)}>
            짝 매칭하기
          </PairButton>

          {isModalSelectMission && <SelectMissionContainer />}
          {isPairingModalOpen && (
            <PairingModal onClose={() => setIsPairingModalOpen(false)} />
          )}
        </Container>
      ) : (
        <Container>
          <Top3Container>
            {[second, first, third].map((pair) => (
              <TopCard key={pair.pairId} $isFirst={pair === first}>
                <MedalWrapper>
                  <Medal
                    src={`/Img/Medal/${
                      pair === first
                        ? "gold"
                        : pair === second
                        ? "silver"
                        : "bronze"
                    }.png`}
                    $isFirst={pair === first}
                  />
                </MedalWrapper>
                <CharImage
                  src="/Img/Gender/man.png"
                  $isFirst={pair === first}
                />
                <PairName $isFirst={pair === first}>
                  {pair.user1Name} {pair.user2Name}
                </PairName>
                <ScoreText $isFirst={pair === first}>{pair.score}점</ScoreText>
              </TopCard>
            ))}
          </Top3Container>

          {others.map((pair, index) => (
            <ListItem key={pair.pairId}>
              <Left>
                <CharImageSmall src="/Img/Gender/man.png" />
                <RankText>{index + 4}th</RankText>
                <NameGroup>
                  <Name>{pair.user1Name}</Name>
                  <Name>{pair.user2Name}</Name>
                </NameGroup>
              </Left>
              <Right>{pair.score}점</Right>
            </ListItem>
          ))}
        </Container>
      )}
    </div>
  );
}

MainMenuPage.propTypes = {
  owner: PropTypes.bool.isRequired,
};

export default MainMenuPage;

const WelcomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
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

// 👇 추가된 PairingModal용 스타일
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

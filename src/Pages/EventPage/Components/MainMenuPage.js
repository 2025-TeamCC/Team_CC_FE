import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../../../util/Container";
import { scoreListGetData } from "../../../data/scoreList";
import PropTypes from "prop-types";
import StepProgressBar from "./StepProgressBar";
import SelectMissionContainer from "./SelectMissionContainer";

function MainMenuPage({owner, isMissionSelected}) {
  const sortedRank = [...(scoreListGetData?.rank || [])].sort(
    (a, b) => b.score - a.score
  );
  const top3 = sortedRank.slice(0, 3);
  const others = sortedRank.slice(3);
  const [second, first, third] = top3;

  const [isModalSelectMission, setIsModalSelectMission] = useState(false);
  
  return (
    <div>
      {
        owner
          ?
            <Container>
              <StepProgressBar currentStep={isMissionSelected ? 2 : 1} />
              <WelcomeContainer>
                <Img src = "/Img/welcome.png" alt = "welcome png"/>
                <WelcomeLabel>{`아직 시작 전이에요!\n팀원들이 참여하고 있어요`}</WelcomeLabel>
              </WelcomeContainer>
              
              {
                isMissionSelected === false && <CreateButton onClick={() => setIsModalSelectMission(true)}>미션 생성하기</CreateButton>
              }
            {
              // onClick 추가하기 (3.1.1)
                isMissionSelected === true && <CreateButton >짝 매칭하기</CreateButton>
              }
              
            {
              isMissionSelected === false && isModalSelectMission && <SelectMissionContainer/>
            }
            </Container>
          :
            <Container>
              <Top3Container>
                {[second, first, third].map((pair) => (
                  <TopCard key={pair.pairId} $isFirst={pair === first}>
                    <MedalWrapper>
                      <Medal
                        src={`/Img/Medal/${pair === first
                            ? "gold"
                            : pair === second
                              ? "silver"
                              : "bronze"
                          }.png`}
                        $isFirst={pair === first}
                      />
                    </MedalWrapper>
                    <CharImage src="/Img/Gender/man.png" $isFirst={pair === first} />
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
      }
    </div>
  );
}

MainMenuPage.propTypes = {
  owner: PropTypes.bool.isRequired,
  isMissionSelected: PropTypes.bool.isRequired
}

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
  line-height: 2; /* Adjusts the line spacing */
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
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, opacity 0.3s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.5;
        }
    }
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

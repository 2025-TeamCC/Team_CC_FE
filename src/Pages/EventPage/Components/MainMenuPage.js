import React from "react";
import styled from "styled-components";
import { Container } from "../../../util/Container";
import { scoreListGetData } from "../../../data/scoreList";

function MainMenuPage() {
  const sortedRank = [...(scoreListGetData?.rank || [])].sort(
    (a, b) => b.score - a.score
  );
  const top3 = sortedRank.slice(0, 3);
  const others = sortedRank.slice(3);
  const [second, first, third] = top3;

  return (
    <div>
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
    </div>
  );
}

export default MainMenuPage;

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
  width: 28px;
  height: 28px;
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

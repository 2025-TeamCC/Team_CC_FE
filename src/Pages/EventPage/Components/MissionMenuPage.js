import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "../../../util/Container";
import { missionListGetData } from "../../../data/missionList";

function MissionMenuPage({ setSelectedMissionId }) {
  const scores = [1, 3, 5, 10, 15];

  return (
    <div>
      <Container>
        {scores.map((score) => {
          const group = missionListGetData.missions
            .filter((m) => m.score === score)
            .sort((a, b) => a.selectedMissionId - b.selectedMissionId);

          return (
            <div key={score}>
              <ScoreTitle>{score}점 미션</ScoreTitle>
              <ScrollContainer>
                {group.map((m) => (
                  <MissionCard
                    key={m.selectedMissionId}
                    $isSubmit={m.isSubmit}
                    onClick={() => {
                      if (!m.isSubmit)
                        setSelectedMissionId(m.selectedMissionId);
                    }}
                  >
                    {m.title}
                  </MissionCard>
                ))}
              </ScrollContainer>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

MissionMenuPage.propTypes = {
  setSelectedMissionId: PropTypes.func.isRequired,
};

const ScoreTitle = styled.h3`
  margin: 20px 0 10px 5px;
  font-size: 18px;
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  gap: 10px;
`;

const MissionCard = styled.div`
  min-width: 140px;
  height: 80px;
  border-radius: 12px;
  background-color: ${({ $isSubmit }) => ($isSubmit ? "#87CEFA" : "#333")};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  cursor: ${({ $isSubmit }) => ($isSubmit ? "default" : "pointer")};
  pointer-events: ${({ $isSubmit }) => ($isSubmit ? "none" : "auto")};
`;

export default MissionMenuPage;

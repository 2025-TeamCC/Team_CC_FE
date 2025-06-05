// StepProgressBar.js
import PropTypes from "prop-types";
import React from "react";
import styled, { keyframes } from "styled-components";

function StepProgressBar({ currentStep = 1 }) {
  // currentStep에 따라 애니메이션 width 설정
  const width = currentStep === 1 ? "50%" : "100%";

  return (
    <Wrapper>
      <LineContainer>
        <LineBackground />
        <LineFill width={width} />
        <StepCircle left="0%" $active={currentStep >= 1} />
        <StepCircle left="100%" $active={currentStep >= 2} />
      </LineContainer>

      <LabelContainer>
        <StepLabel>
          <StepTitle $active={currentStep === 1}>Step 1</StepTitle>
          <StepText>미션 생성하기</StepText>
        </StepLabel>
        <StepLabel>
          <StepTitle $active={currentStep === 2}>Step 2</StepTitle>
          <StepText>짝 배정하기</StepText>
        </StepLabel>
      </LabelContainer>
    </Wrapper>
  );
}


StepProgressBar.propTypes = {
    currentStep: PropTypes.number.isRequired
}

export default StepProgressBar;


const Wrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 50px;
`;

const LineContainer = styled.div`
  position: relative;
  height: 10px;
  margin-bottom: 20px;
`;

const LineBackground = styled.div`
  width: 100%;
  height: 4px;
  background-color: #d3d3d3;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const createAnimateFill = (toWidth) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${toWidth};
  }
`;

const LineFill = styled.div`
  height: 4px;
  background-color: #5c5cff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  width: ${(props) => props.width};
  animation: ${(props) => createAnimateFill(props.width)} 0.8s ease-in-out;
`;

const StepCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.active ? "#5c5cff" : "#ccc")};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${(props) => props.left};
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StepLabel = styled.div`
  text-align: center;
`;

const StepTitle = styled.div`
  font-weight: bold;
  color: ${(props) => (props.active ? "#000" : "#888")};
`;

const StepText = styled.div`
  margin-top: 4px;
  font-size: 14px;
`;

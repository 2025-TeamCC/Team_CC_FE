import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Header from "../../util/Layout/Components/Header";

export default function LandingPage() {
  return (
    <Wrapper>
      <Header />

      <HeroSection>
        <SubTitle
          as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          팀 배정, 미션 관리, 실시간 순위까지 한 번에! 🎯
        </SubTitle>
        <Title
          as={motion.h1}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Img src = "/Img/randingChar.png" alt = "char img"/>
        </Title>
      </HeroSection>

      <Section
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle>❗ 시스템이 필요한 이유</SectionTitle>
        <List>
          <li>📌 수동 팀 배정 → 비효율과 불공정 발생</li>
          <li>💬 카카오톡 기반 진행 → 정보 분산, 확인 어려움</li>
          <li>📝 미션/점수 수작업 → 운영진 부담 증가</li>
        </List>
      </Section>

      <Section
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle>⚙️ 자동화된 기능</SectionTitle>
        <Grid>
          <Card whileHover={{ scale: 1.05 }}>
            <h3>🤖 1. 자동 팀/페어 배정</h3>
            <p>성별, 신입 여부 기반 알고리즘 매칭</p>
          </Card>
          <Card whileHover={{ scale: 1.05 }}>
            <h3>📤 2. 미션 제출 & 채점</h3>
            <p>미션 증빙 업로드, 자동 점수 반영</p>
          </Card>
          <Card whileHover={{ scale: 1.05 }}>
            <h3>📈 3. 실시간 순위 시스템</h3>
            <p>팀/페어 순위를 직관적으로 확인</p>
          </Card>
        </Grid>
      </Section>

      <Section
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle>💬 이용자 인터뷰에서 얻은 통찰</SectionTitle>
        <Quote>
          &ldquo;매번 점수 집계와 순위 업데이트가 너무 번거로웠어요. 이 시스템 덕분에 관리가 훨씬 쉬워졌습니다!&rdquo;
        </Quote>
        <Quote>
          &ldquo;참여자들도 자신이 얼마나 활동했는지 바로 확인할 수 있어요. 흥미와 경쟁심을 자극합니다.&rdquo;
        </Quote>
      </Section>

      <Section
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle>✨ 와우 포인트</SectionTitle>
        <Grid>
          <Card whileHover={{ scale: 1.05 }}>
            <h3>📸 인증 피드</h3>
            <p>모든 미션 인증은 피드에서 바로 확인 가능</p>
          </Card>
          <Card whileHover={{ scale: 1.05 }}>
            <h3>🏆 랭킹 제도</h3>
            <p>팀CC 점수를 실시간으로 확인 가능</p>
          </Card>
        </Grid>
      </Section>

      <Section
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle>🔥 Team CC, 지금 바로 시작해보세요</SectionTitle>
        <StartButton
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 시스템 시작하기
        </StartButton>
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 24px;
`;

const HeroSection = styled.div`
  text-align: center;
  margin: 180px 0 160px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 32px;
  text-align: center;
`;

const SubTitle = styled.p`
  font-size: 22px;
  color: #444;
  text-align: center;
  margin-bottom: 100px;
`;

const Section = styled.div`
  margin: 180px 0;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 48px;
  text-align: center;
  color: #333;
`;

const List = styled.ul`
  font-size: 19px;
  line-height: 2.4;
  padding-left: 0;
  color: #555;
  list-style: none;
`;

const Grid = styled.div`
  display: grid;
  gap: 48px;
`;

const Card = styled(motion.div)`
  background-color: #eef1f9;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;

  h3 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 14px;
    color: #1e1e2f;
  }

  p {
    font-size: 17px;
    color: #555;
  }
`;

const Quote = styled.p`
  font-size: 19px;
  color: #2e2e2e;
  font-style: italic;
  margin-bottom: 40px;
  text-align: center;
`;

const StartButton = styled(motion.button)`
  display: block;
  width: 100%;
  padding: 28px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  background-color: #3366ff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 56px;
`;

const Img = styled.img`
    width: 300px;
`;
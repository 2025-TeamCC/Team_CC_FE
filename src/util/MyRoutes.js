import React from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import RandingPage from "../Pages/RandingPage/RandingPage";
import EventListPage from "../Pages/EventListPage/EventListPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import MissionCreatePage from "../Pages/MissionCreatePage/MissionCreatePage";
import EventPage from "../Pages/EventPage/EventPage";
import MissionPage from "../Pages/MissionPage/MissionPage";
import MissionSubmissionPage from "../Pages/MissionSubmissionPage/MissionSubmissionPage";
import SummaryPage from "../Pages/SummaryPage/SummaryPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";

function MyRoutes() {
  return (
    <Routes>
      {/* 공통 레이아웃 */}
      <Route element={<Layout />}>
        {/* 랜딩 페이지: 로그인 버튼 및 서비스 소개 */}
        <Route path="/" element={<RandingPage />} />

        {/* 회원가입 페이지: 사용자 기본 정보 입력 */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 이벤트 리스트 페이지: 과거 학기 및 진행 중인 팀 목록 조회, 생성, 참가 */}
        <Route path="/eventlist" element={<EventListPage />} />

        {/* 미션 생성 페이지: 팀장이 점수별 미션 작성 */}
        <Route path="/mission/create" element={<MissionCreatePage />} />

        {/* 이벤트 상세 페이지: 팀의 현재 상태 (짝 배정, 미션 시작 등) */}
        <Route path="/event" element={<EventPage />} />

        {/* 미션 페이지: 팀별 미션 목록 확인 및 업로드 */}
        <Route path="/mission" element={<MissionPage />} />

        {/* 미션 인증 페이지: 미션 인증 내역 작성 및 수정 */}
        <Route path="/mission/submission" element={<MissionSubmissionPage />} />

        {/* 결과 페이지: 이벤트 최종 순위 및 팀별 미션 결과 */}
        <Route path="/summary" element={<SummaryPage />} />

        {/* 404 페이지 처리 */}
        <Route path="*" element={<NotFoundPage />} />

        {/* <Route path="/test" element={<TestPage />} /> */}
      </Route>
    </Routes>
  );
}

export default MyRoutes;

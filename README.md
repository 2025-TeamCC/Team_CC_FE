# 🎨 TeamCC_FE

> 한동대학교의 전통적인 팀 교류 프로그램 **팀CC**를 온라인에서 쉽고 재미있게 운영할 수 있도록 지원하는 프론트엔드 웹 애플리케이션입니다.  
> 참여자는 Google 계정으로 로그인하여 이벤트에 참여하고, 미션을 수행하며, 인증을 통해 팀워크를 높일 수 있습니다.

---

## 📚 목차

1. [📝 프로젝트 개요](#📝-프로젝트-개요)
2. [⚙️ 기술 스택](#⚙️-기술-스택)
3. [🚀 주요 기능](#🚀-주요-기능)
4. [🔧 설치 및 실행 방법](#🔧-설치-및-실행-방법)
5. [📁 폴더 구조](#📁-폴더-구조)
6. [🖼️ 페이지 흐름 및 UI 구성](#🖼️-페이지-흐름-및-ui-구성)
7. [🔗 API 연동 및 인증 구조](#🔗-api-연동-및-인증-구조)
8. [🧪 테스트 전략 및 코드 품질 관리](#🧪-테스트-전략-및-코드-품질-관리)
9. [🤝 기여 가이드](#🤝-기여-가이드)
10. [📄 라이선스](#📄-라이선스)
11. [📬 연락처](#📬-연락처)

---

## 📝 프로젝트 개요

- **TeamCC_FE**는 팀CC 이벤트의 참가자/관리자가 쉽게 미션을 수행하고, 점수를 기록하며, 교류 활동을 관리할 수 있도록 UI를 제공합니다.
- Google OAuth2 인증을 통해 로그인하고, 초대코드 기반으로 이벤트에 참여할 수 있습니다.
- 짝 매칭, 미션 인증, 점수 확인, 순위표 등 주요 기능이 포함됩니다.
- 백엔드는 [TeamCC_BE](https://github.com/2025-TeamCC/Team_CC_BE)와 연동되어 작동합니다.

---

## ⚙️ 기술 스택

| 분야        | 사용 기술               |
| ----------- | ----------------------- |
| 프레임워크  | React 19                |
| 라우팅      | React Router DOM v7     |
| 상태 관리   | useState, Context API   |
| 스타일링    | styled-components       |
| API 통신    | Axios                   |
| 인증        | Google OAuth2 + JWT     |
| 테스트      | Testing Library (React) |
| 코드 스타일 | ESLint, Prettier (예정) |

---

## 🚀 주요 기능

- 🔐 **Google OAuth2 로그인** 및 JWT 저장
- 📩 **초대코드 기반 이벤트 참여**
- 🤝 **짝 매칭 결과 조회 및 상태 확인**
- 📋 **미션 목록 확인 및 진행 상태**
- 📸 **미션 인증 사진 제출**
- 🏆 **점수 기반 사용자 순위표 확인**
- 📱 **모바일/태블릿 대응 UI (반응형)**

---

## 🔧 설치 및 실행 방법

```bash
# 1. 레포지토리 클론
git clone https://github.com/2025-TeamCC/Team_CC_FE.git

# 2. 디렉토리 이동
cd Team_CC_FE

# 3. 의존성 설치
npm install

# 4. 환경변수 파일 생성 (.env)
REACT_APP_API_URL=http://localhost:8080

# 5. 개발 서버 실행
npm start
```

---

## 📁 폴더 구조

```bash
src/
├── API/                    # axios 기반 API 모듈 (Auth, Code, Event)
├── Assets/                 # 정적 이미지 리소스
├── Pages/                  # 주요 페이지 컴포넌트
│   └── EventAttendPage/    # 예시: 이벤트 참여 페이지
├── util/
│   ├── form/               # 폼 입력 UI 컴포넌트
│   ├── modal/              # 공통 모달 컴포넌트
│   └── Layout/             # Header 등 레이아웃 구성 요소
├── App.js                  # 전체 라우팅 및 구조 설정
└── index.js                # React 애플리케이션 진입점
```

---

## 🖼️ 페이지 흐름 및 UI 구성

| 페이지                    | 설명                            |
| ------------------------- | ------------------------------- |
| **LandingPage**           | 첫 진입 화면, 로그인 유도       |
| **RegisterPage**          | 초대코드 입력 후 이벤트 참가    |
| **EventAttendPage**       | 참가자 정보 입력 및 확인        |
| **MissionMenuPage**       | 점수별로 미션 목록 조회 및 선택 |
| **MissionDetailPage**     | 개별 미션 설명 확인             |
| **MissionSubmissionPage** | 사진 업로드 후 인증 제출        |
| **SummaryPage**           | 랭킹 및 점수 확인 (최종 요약)   |

---

## 🔗 API 연동 및 인증 구조

### 🔐 인증 흐름

1. Google OAuth2 로그인 후 → JWT 토큰 발급
2. `sessionStorage`에 `accessToken` 저장
3. 이후 모든 API 요청 시 아래처럼 인증 헤더 포함

```js
axios.post("/event/join", data, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
});
```

### 📡 API 구조

- `/auth`: 로그인 요청
- `/event/code`: 초대코드 유효성 검증
- `/event/join`: 이벤트 참여
- `/pairing/start`: 짝 매칭 시작
- `/mission/pair`: 미션 상태 조회
- `/mission/submit`: 미션 인증 제출
- `/ranking`: 사용자 점수 기반 랭킹

---

## 🧪 테스트 전략 및 코드 품질 관리

### ✅ 테스트 전략

TeamCC_FE는 `Jest`와 `@testing-library/react` 기반으로 **단위/통합 테스트**를 수행합니다.

| 테스트 수준                  | 설명                                    | 사용 도구             |
| ---------------------------- | --------------------------------------- | --------------------- |
| **단위 테스트**              | 개별 컴포넌트 또는 유틸 함수 테스트     | Jest, Testing Library |
| **통합 테스트**              | 페이지 단위 UI 흐름 테스트              | Testing Library       |
| **E2E 테스트** _(향후 적용)_ | 브라우저 기반 실제 사용자 시나리오 검증 | Cypress / Playwright  |

**모킹**은 `jest.mock()` 또는 MSW 도입 예정입니다.

```js
jest.mock("../../API/Code", () => ({
  codeVerifyAPI: jest.fn(() => Promise.resolve({ success: true })),
}));
```

**Coverage** 리포트는 다음 명령어로 확인할 수 있습니다:

```bash
npm test -- --coverage
```

### 🔢 테스트 우선순위 기준

| 우선도  | 대상                           | 이유                       |
| ------- | ------------------------------ | -------------------------- |
| 🔴 높음 | 로그인, 이벤트 참여, 미션 제출 | 주요 기능의 정상 작동 보장 |
| 🟡 중간 | 모달, 폼                       | UX 안정성 확보             |
| 🟢 낮음 | 순위, 스타일만 관련된 컴포넌트 | 기능 영향도 낮음           |

---

### 🧼 코드 스타일 및 린트 전략

본 프로젝트는 **ESLint**를 기반으로 JavaScript 문법 및 React 코드 스타일을 엄격히 관리합니다.

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {}
}
```

- `eslint:recommended` 및 `plugin:react/recommended`를 사용
- VSCode ESLint 확장과 함께 사용하면 저장 시 자동 포맷팅 가능
- 향후 Prettier 연동을 통해 포맷 일관성도 강화 예정

---

## 🤝 기여 가이드

1. 이슈를 등록하고 논의 후 작업 시작
2. 브랜치 생성

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. 커밋 메시지 명확히 작성

   ```bash
   git commit -m "feat: 미션 제출 기능 구현"
   ```

4. PR 생성 및 코드 리뷰 요청

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
자세한 내용은 [LICENSE](./LICENSE)를 참고하세요.

---

## 📬 링크

- GitHub: [TeamCC_FE](https://github.com/2025-TeamCC/Team_CC_FE)
- 백엔드 레포: [TeamCC_BE](https://github.com/2025-TeamCC/Team_CC_BE)

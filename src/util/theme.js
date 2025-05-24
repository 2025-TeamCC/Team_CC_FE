// theme.js

// 반응형 디자인을 위한 브레이크포인트 설정
const breakpoints = {
    mobile: "480px",  // 모바일 화면 최대 너비
    tablet: "768px",  // 태블릿 화면 최대 너비
    desktop: "1024px" // 데스크톱 화면 최대 너비
};

// 전역 테마 설정
const theme = {
    colors: {
        primary: "#0070f3",  // 기본(primary) 색상 (파란색 계열)
        secondary: "#1c1c1c", // 보조(secondary) 색상 (어두운 회색)
        background: "#f5f5f5", // 배경 색상 (밝은 회색)
        text: "#333" // 기본 텍스트 색상 (어두운 회색)
    },
    spacing: {
        small: "8px",  // 작은 간격
        medium: "16px", // 중간 간격
        large: "24px"  // 큰 간격
    },
    maxWidth: "1200px", // 콘텐츠 최대 너비
    fontSizes: {
        small: "14px",  // 작은 폰트 크기
        medium: "16px", // 기본 폰트 크기
        large: "20px",  // 큰 폰트 크기
        xlarge: "24px"  // 매우 큰 폰트 크기
    },
    media: {
        // 반응형 미디어 쿼리
        mobile: `(max-width: ${breakpoints.mobile})`,  // 모바일 화면용 스타일
        tablet: `(max-width: ${breakpoints.tablet})`,  // 태블릿 화면용 스타일
        desktop: `(max-width: ${breakpoints.desktop})` // 데스크톱 화면용 스타일
    },
    mixins: {
        // 특정 브레이크포인트에 대한 반응형 스타일 적용 함수
        responsive: (key) => `@media (max-width: ${breakpoints[key]})`
    }
};

// 설정한 테마를 외부에서 사용할 수 있도록 export
export default theme;

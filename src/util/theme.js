const theme = {
    colors: {
        primary: "#0070f3",  // 기본(primary) 색상 (파란색 계열)
        secondary: "#1c1c1c", // 보조(secondary) 색상 (어두운 회색)
        background: "#f5f5f5", // 배경 색상 (밝은 회색)
        text: "#333" // 기본 텍스트 색상 (어두운 회색)
    },
    bgcolors: {
        gray: "#F4F4F4",
        white : "#ffffff",
    },
    spacing: {
        px6 : "6px",
        px8: "8px",  
        px10 : "10px",
        px12: "12px",  
        px14 : "14px",
        px16: "16px",  
        px18 : "18px",
        px20: "20px",
    },
    maxWidth: "480px", // 콘텐츠 최대 너비
    fontSizes: {
        small: "14px",  // 작은 폰트 크기
        medium: "16px", // 기본 폰트 크기
        large: "20px",  // 큰 폰트 크기
        xlarge: "24px"  // 매우 큰 폰트 크기
    }
};

export default theme;



////// theme 사용법 (일반 속성)
//// 1) ${({theme) => theme.colors.primary} 형태로 사용)}
//// 2) 예시
// import styled from "styled-components";

// const Button = styled.button`
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: white;
//   font-size: ${({ theme }) => theme.fontSizes.medium};
//   padding: 8px 16px;
//   border: none;
//   border-radius: 4px;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.secondary};
//   }
// `;

// export default Button;


const theme = {
    colors: {
        primary: "#5158FF",
        white: "#ffffff",
        black: "#000000",
        gray: "#F4F4F4",
        boldGray : "#B7B7B7",
    },
    bgcolors: {
        gray: "#F4F4F4",
        boldGray : "#B7B7B7",
        white: "#ffffff",
        primary: "#5158FF",
        red : "#ED4C5C"
        
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
        "2xs" : "0.5rem",
        xs: "0.75rem",       // 12px - 서브 텍스트, 라벨
        sm: "0.875rem",      // 14px - 보조 텍스트
        base: "1rem",        // 16px - 기본 본문 텍스트
        lg: "1.125rem",      // 18px - 강조된 본문
        xl: "1.25rem",       // 20px - 카드 제목
        "2xl": "1.5rem",     // 24px - 섹션 제목
        "3xl": "1.875rem",   // 30px - 페이지 제목
        "4xl": "2.25rem",    // 36px - 큰 제목
        "5xl": "3rem"        // 48px - 히어로 타이틀
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


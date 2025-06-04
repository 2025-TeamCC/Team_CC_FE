// src/components/GoogleLoginButton.jsx
import React from "react";
import {useGoogleLogin} from "@react-oauth/google";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../API/AuthAPI";

const GoogleLoginButton = ()  => {
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("✅ Google 로그인 성공!");
            console.log("accessToken:", tokenResponse.access_token);

            const response = await loginAPI(tokenResponse);
            
            if (response) {
                navigate("/eventlist");
            } else {
                navigate("/register");
            }

            // // 예시: accessToken으로 사용자 정보 요청
            // fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            //     headers: {
            //         Authorization: `Bearer ${tokenResponse.access_token}`
            //     }
            // })
            //     .then((res) => res.json())
            //     .then((userInfo) => {
            //         console.log("👤 사용자 정보:", userInfo);
            //         // 여기서 백엔드로 전송하거나 전역 상태 저장

            //         navigate("/eventlist");
            //     });
        },
        onError: () => {
            console.log("❌ Google 로그인 실패");
        },
        scope: "openid profile email https://www.googleapis.com/auth/userinfo.profile"
    });

    return (
        <LoginText onClick={() => login()}>
            Google로 로그인
        </LoginText>
    );
};

export default GoogleLoginButton;

const LoginText = styled.div`
    color : ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.bgcolors.primary};
    padding : 4px 10px;
    border-radius: 5px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    
    transition: opacity 0.3s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.5;
        }
    }
`;
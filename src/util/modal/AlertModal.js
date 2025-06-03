import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function AlertModal({title, desc, onClose}) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape" || e.key === "Enter") 
                onClose();
            };
        window.addEventListener("keydown", handleKey);
        return() => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <Overlay onClick={handleClickOutside}>
            <ModalBox ref={modalRef}>
                <Title>{title}</Title>
                <Description>{desc}</Description>
                <ButtonRow>
                    <Button onClick={onClose} $type="confirm">확인</Button>
                </ButtonRow>
            </ModalBox>
        </Overlay>
    );
}

AlertModal.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default AlertModal;

// 스타일은 ConfirmModal에서 그대로 재사용

const Overlay = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalBox = styled.div `
    background-color: ${ ({
    theme}) => theme.colors.white};
    padding: 24px 20px;
    border-radius: 12px;
    width: 80%;
    max-width: 320px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    text-align: center;
`;

    const Title = styled.h2 `
    font-size: ${ ({
        theme}) => theme.fontSizes.lg};
    font-weight: bold;
    margin-bottom: 12px;
    white-space: pre-line;
`;

        const Description = styled.p `
    font-size: ${ ({
            theme}) => theme.fontSizes.sm};
    color: ${ ({
                theme}) => theme.colors.boldGray};
    margin-bottom: 24px;
`;

                const ButtonRow = styled.div `
    display: flex;
    justify-content: center;
`;

                const Button = styled.button `
    flex: 1;
    height: 40px;
    border-radius: 6px;
    border: none;
    font-weight: bold;
    font-size: ${ ({
                    theme}) => theme.fontSizes.base};
    cursor: pointer;

    background-color: ${ ({
                        theme}) => theme.bgcolors.primary};
    color: ${ ({
        theme }) => theme.colors.white};
        
    transition: opacity 0.3s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.5;
        }
    }
`;

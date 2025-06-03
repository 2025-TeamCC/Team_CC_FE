import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { InputButton, InputButtonRow, InputLabel, InputRow } from "../form/InputComponents";

function InputButtonModal({setSaesae, saesae,  title, desc, onCancel, onConfirm}) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") 
                onCancel();
            if (e.key === "Enter") 
                onConfirm();
            };
        window.addEventListener("keydown", handleKey);
        return() => window.removeEventListener("keydown", handleKey);
    }, [onCancel, onConfirm]);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onCancel();
        }
    };

    return (
        <Overlay onClick={handleClickOutside}>
            <ModalBox ref={modalRef}>
                <Title>{title}</Title>
                <Description>{desc}</Description>
                <InputModalInputRow>
                    <InputLabel>새새 여부</InputLabel>
                    <InputButtonRow>
                        <InputModalInputButton onClick={() => setSaesae(false)} $isActive = {saesae === false}>X</InputModalInputButton>
                        <InputModalInputButton onClick={() => setSaesae(true)} $isActive = {saesae === true}>O</InputModalInputButton>
                    </InputButtonRow>
                </InputModalInputRow>
                <ButtonRow>
                    <Button onClick={onCancel} $type="cancel">취소</Button>
                    <Button onClick={onConfirm} $type="confirm">확인</Button>
                </ButtonRow>
            </ModalBox>
        </Overlay>
    );
}

InputButtonModal.propTypes = {
    setSaesae: PropTypes.func.isRequired,
    saesae : PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default InputButtonModal;

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
    gap: 10px;
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

    background-color: ${ ({$type,
                        theme}) =>
        $type === "confirm" ? theme.bgcolors.primary : theme.bgcolors.gray};
    color: ${ ({
                            $type, theme}) =>
    $type === "confirm" ? theme.colors.white : theme.colors.black};
    
    transition: opacity 0.3s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.5;
        }
    }
`;

const InputModalInputRow = styled(InputRow)`
    width: 100%;
    padding : 0px 60px;
    box-sizing: border-box;

`;

const InputModalInputButton = styled(InputButton)`
    height: 30px;
`;
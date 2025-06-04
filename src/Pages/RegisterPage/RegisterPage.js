import React, {useState} from 'react';
import Header from '../../util/Layout/Components/Header';
import {Container} from '../../util/Container';
import {
    Input,
    InputButton,
    InputButtonRow,
    InputLabel,
    InputRow,
    SubmitButton
} from '../../util/form/InputComponents';
import styled from 'styled-components';
import {EmptyDiv} from '../../util/EmptyDiv';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../util/modal/AlertModal';
import ConfirmModal from '../../util/modal/ConfirmModal';
import { registerAPI } from '../../API/AuthAPI';

function RegisterPage() {

    const navigate = useNavigate();
    const [form, setForm] = useState({name: null, gender: null, studentId: null});
    const [isModalSubmit, setIsModalSubmit] = useState(false);
    const [isModalCheck, setIsModalCheck] = useState(false);
    const handleChange = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value
        });
    };
    const handleGenderClick = (gender) => {
        setForm({
            ...form,
            gender
        });
    };

    const handleRegister = async () => {
        const registerInfo = {
            name: form.name,
            gender: form.gender,
            studentId : form.studentId
        }
        await registerAPI(registerInfo);
    }

    const isFormValid = form.name && form.studentId && form.gender !== null;

    return (
        <div>
            <Header desc="회원가입"/>
            <EmptyDiv $height="40px"/>
            <Container>
                <InputRow>
                    <InputLabel>이름</InputLabel>
                    <Input type="text" value={form.name} onChange={handleChange('name')}/>
                </InputRow>
                <InputRow>
                    <InputLabel>성별</InputLabel>
                    <InputButtonRow>
                        <InputGenderButton onClick={() => handleGenderClick(false)} $isActive = {form.gender === false} $gender={false}><Img src="/Img/Gender/beforeMan.png" alt="man image"/></InputGenderButton>
                        <InputGenderButton onClick={() => handleGenderClick(true)} $isActive = {form.gender === true} $gender={true}><Img src="/Img/Gender/beforeWoman.png" alt="woman image"/></InputGenderButton>
                    </InputButtonRow>
                </InputRow>
                <InputRow>
                    <InputLabel>학번</InputLabel>
                    <Input
                        type="number"
                        value={form.studentId}
                        onChange={handleChange('studentId')}/>
                </InputRow>
                <SubmitButton disabled={!isFormValid} onClick={() => setIsModalSubmit(true)}>가입하기</SubmitButton>
            </Container>
            {
                isModalSubmit && (
                    <ConfirmModal
                        title={`${form.name}, ${form.gender ? '여자' : '남자'}, ${form.studentId}`}
                        desc="위의 정보로 가입하시겠습니까?"
                        onCancel={() => setIsModalSubmit(false)}
                        onConfirm={() => {
                            // 서버 연결 : /user POST를 진행.

                            handleRegister();
                            setIsModalSubmit(false);
                            setIsModalCheck(true);
                        }}/>
                )
            }
            {
                isModalCheck && (
                    <AlertModal
                        title={`${form.name}님 환영합니다!`}
                        desc="지금 바로 팀 CC 이벤트를 진행해보세요!"
                        onClose={() => {
                            setIsModalCheck(false);
                            navigate("/eventlist");
                            // Safari 대응 위해 약간 지연 후 스크롤
                            setTimeout(() => {
                                window.scrollTo({top: 0, behavior: "smooth"});
                            }, 0);
                        }}/>
                )
            }
        </div>
    );
}

const Img = styled.img `
  width: 25px;
  height : 25px;
`;

const InputGenderButton = styled(InputButton)`
    width: 100%;
    height : 40px;
    border-radius: 5px;

    background-color: ${({ $isActive, $gender, theme }) =>
        $isActive
            ? $gender
                ? theme.colors.pink   // 여성
                : theme.colors.blue   // 남성
            : theme.bgcolors.boldGray};

    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ $isActive, theme }) => $isActive ? theme.colors.white : theme.colors.black};
    border: none;

    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    box-shadow: ${({ $isActive, $gender, theme }) =>
        $isActive
            ? `0 0 8px ${$gender ? theme.colors.pink : theme.colors.blue}`
            : 'none'};
`;

export default RegisterPage;
import React, {useState} from 'react';
import Header from '../../util/Layout/Components/Header';
import {Container} from '../../util/Container';
import BackPage from '../EventAttendPage/Components/BackPage';
import {
    Input,
    InputButton,
    InputButtonRow,
    InputLabel,
    InputRow,
    SubmitButton
} from './Components/InputComponents';
import {useNavigate} from "react-router-dom";
import ConfirmModal from '../../util/modal/ConfirmModal';
import AlertModal from '../../util/modal/AlertModal';

function EventCreatePage() {

    const navigate = useNavigate();

    const [isModalBackPage, setIsModalBackPage] = useState(false);
    const [isModalSubmit, setIsModalSubmit] = useState(false);
    const [isModalCheck, setIsModalCheck] = useState(false);


    const [form, setForm] = useState(
        {year: null, semester: null, professor: null, endDate: null}
    );

    
    const handleChange = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value
        });
    };
    
    const handleSemesterClick = (semester) => {
        setForm({
            ...form,
            semester
        });
    };
    
    const isFormValid = form.year && form.semester && form.professor && form.endDate;


    return (
        <div>
            <Header desc="생성하기"/>
            <Container>
                <BackPage openModal={() => setIsModalBackPage(true)} />
                <InputRow>
                    <InputLabel>년도</InputLabel>
                    <Input type="number" value={form.year} onChange={handleChange('year')}/>
                </InputRow>
                <InputRow>
                    <InputLabel>학기</InputLabel>
                    <InputButtonRow>
                        <InputButton onClick={() => handleSemesterClick(1)} $isActive = {form.semester === 1}>1학기</InputButton>
                        <InputButton onClick={() => handleSemesterClick(2)} $isActive = {form.semester === 2}>2학기</InputButton>
                    </InputButtonRow>
                </InputRow>
                <InputRow>
                    <InputLabel>팀교수님</InputLabel>
                    <Input type="text" value={form.professor} onChange={handleChange('professor')}/>
                </InputRow>
                <InputRow>
                    <InputLabel>마감일</InputLabel>
                    <Input type="date" value={form.endDate} onChange={handleChange('endDate')}/>
                </InputRow>
                <SubmitButton disabled={!isFormValid} onClick={() => setIsModalSubmit(true)}>생성하기</SubmitButton>
            </Container>
            {isModalBackPage && (
                <ConfirmModal
                    title="뒤로 가시겠습니까?"
                    desc="작성 중인 내용이 저장되지 않고 사라집니다."
                    onCancel={() => setIsModalBackPage(false)}
                    onConfirm={() => {
                        setIsModalBackPage(false);
                        navigate("/eventlist");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                />
            )}
            {isModalSubmit && (
                <ConfirmModal
                    title={`${form.year}년 ${form.semester}학기 ${form.professor} 교수님\n${form.endDate} 마감`}
                    desc="위의 정보로 생성하시겠습니까?"
                    onCancel={() => setIsModalSubmit(false)}
                    onConfirm={() => {
                        // 서버 연결 : /event POST를 진행.
                        setIsModalSubmit(false);
                        setIsModalCheck(true);
                    }}
                />
            )}
            {isModalCheck && (
                <AlertModal
                    title={`${form.year}년 ${form.semester}학기 ${form.professor} 교수님 팀\n\n`}
                    desc="이벤트룸이 생성되었습니다!"
                    onClose={() => {    
                        setIsModalCheck(false);
                        navigate("/eventlist");
                        // Safari 대응 위해 약간 지연 후 스크롤
                        setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }, 0);
                    }}
                />
            )}
        </div>
    );
}

export default EventCreatePage;

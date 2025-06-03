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

function EventCreatePage() {

    const navigate = useNavigate();

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

    const handleSubmit = () => {
        if (!isFormValid) {
            alert("모든 항목을 입력해주세요!");
            return;
        } else {
            if (window.confirm("생성하시겠습니까?")) {
                alert("생성 완료!\n" + JSON.stringify(form, null, 2))  
                navigate("/eventlist");
                // Safari 대응 위해 약간 지연 후 스크롤
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }, 0);
            } 
        }
    }

    return (
        <div>
            <Header desc="생성하기"/>
            <Container>
                <BackPage/>
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
                <SubmitButton disabled={!isFormValid} onClick={handleSubmit}>생성하기</SubmitButton>
            </Container>
        </div>
    );
}

export default EventCreatePage;

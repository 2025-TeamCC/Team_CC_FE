import React, {useState} from 'react';
import Header from '../../util/Layout/Components/Header';
import {Container} from '../../util/Container';
import BackPage from '../EventAttendPage/Components/BackPage';
import {
    Input,
    InputLabel,
    InputRow,
    SubmitButton
} from '../../util/form/InputComponents';
import {useNavigate} from "react-router-dom";
import ConfirmModal from '../../util/modal/ConfirmModal';
import AlertModal from '../../util/modal/AlertModal';
import InputModal from '../../util/modal/InputButtonModal';
import { attendAPI, codeVerifyAPI } from '../../API/Code';

function EventAttendPage() {

    const navigate = useNavigate();

    const [isModalBackPage, setIsModalBackPage] = useState(false);
    const [isModalInput, setIsModalInput] = useState(false);
    const [isModalCheck, setIsModalCheck] = useState(false);
    const [isModalReject, setIsModalReject] = useState(false);
    const [isModalRejectAttend, setIsModalRejectAttend] = useState(false);
    const [eventId, setEventId] = useState(null);
    

    const [attendInfo, setAttendInfo] = useState("");
    const [saesae, setSaesae] = useState(null);


    const [inputCode, setInputCode] = useState(null);
    
    const handleClickAttend = async () => {
        // 서버 연결 : /event/code POST

        const response = await codeVerifyAPI(inputCode);

        // const response = {
        //     status : "fail"
        // }

        // 로직 설명 : response의 status가 있다고 가정하고 진행.
        if (!response) {
            setIsModalReject(true);
        }
        else {
            setAttendInfo(response.year + "년 " + response.semester + "학기 " + response.professor + "교수님");
            setIsModalInput(true)
            setEventId(response.eventId);
        }
    }


    return (
        <div>
            <Header desc="참여하기"/>
            <Container>
                <BackPage openModal={() => setIsModalBackPage(true)} />
                <InputRow>
                    <InputLabel>참여코드</InputLabel>
                    <Input type="text" value={inputCode} onChange={(e) => setInputCode(e.target.value)}/>
                </InputRow>
                <SubmitButton disabled={!inputCode} onClick={handleClickAttend}>참여하기</SubmitButton>
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
            {isModalInput && (
                <InputModal
                    setSaesae={setSaesae}
                    saesae = {saesae}
                    title = {attendInfo}
                    desc="위의 이벤트로 참여하시겠습니까?"
                    onCancel={() => setIsModalInput(false)}
                    onConfirm={async () => {
                        // 서버 연결 : /event/join POST를 진행.
                        // 서버 연결 유의사항 : 새새 여부, eventId 같이 넘겨서 보내면 됌.
                        const postAttendInfo = {
                            eventId: eventId,
                            isSaeSae : saesae
                        }

                        await attendAPI(postAttendInfo);
                        // 잘 받은 경우
                        setIsModalInput(false);
                        setIsModalCheck(true);

                        // 잘 못 받은 경우 (이미 참여한 경우)
                        // setIsModalInput(false);
                        // setIsModalRejectAttend(true);

                    }}
                />
            )}
            {isModalCheck && (
                <AlertModal
                    title = {attendInfo}
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
            {isModalReject && (
                <AlertModal
                    title = "참여 코드가 맞지 않아요."
                    desc="팀장에게 코드를 다시 받아서 입력해 주세요!"
                    onClose={() => {    
                        setIsModalReject(false);
                    }}
                />
            )}

            {isModalRejectAttend && (
                <AlertModal
                    title = "이미 참여한 이벤트에요."
                    desc="한 번 참여한 이벤트는 중복 참여가 불가능해요!"
                    onClose={() => {    
                        setIsModalRejectAttend(false);
                    }}
                />
            )}
            
            
        </div>
    );
}

export default EventAttendPage;

import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Header from '../../util/Layout/Components/Header';
import MenuBar from './Components/MenuBar';
import MainMenuPage from './Components/MainMenuPage';
import MemberMenuPage from './Components/MemberMenuPage';
import MissionMenuPage from './Components/MissionMenuPage';
import MissionSubmissionPage from './Components/MissionSubmissionPage';
import {eventAPI, memberAPI} from '../../API/Event';

function EventPage() {
    const [selectedMissionId, setSelectedMissionId] = useState(null);
    const [selectedSelectedMissionId, setSelectedSelectedMissionId] = useState(null);
    const [pairId, setPairId] = useState(null);
    
    const [eventInfo, setEventInfo] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [selectMenu, setSelectMenu] = useState(1);
    const {eventId} = useParams();
    const owner = eventInfo?.isOwner;

    const goBackToMissionMenu = () => setSelectedMissionId(null);

    useEffect(() => {
        async function fetchEvent() {
            try {
                const response = await eventAPI(eventId);
                if (response) {
                    setEventInfo(response);
                }
            } catch (error) {
                console.error("Failed to fetch event list:", error);
            }
        }
        async function fetchMember() {
            try {
                const response = await memberAPI(eventId);
                if (response) {
                    setMemberList(response?.members);
                }
            } catch (error) {
                console.error("Failed to fetch event list:", error);
            }
        }


        fetchEvent();
        fetchMember();
    }, []);

    return (
        <div>
            <Header
                desc={`${eventInfo?.year}-${eventInfo.semester} ${eventInfo.professor} 교수님`}
            />
            <MenuBar
                selectMenu={selectMenu}
                setSelectMenu={setSelectMenu}
                code={eventInfo.inviteCode}
                isPaired={eventInfo?.isPaired}
            />
            <div className="page">
                {selectMenu === 1 && <MainMenuPage owner={owner} isMissionSelected={eventInfo?.isMissionSelected} isPaired={eventInfo?.isPaired} isSelected={eventInfo?.isSelected}/>}
                {selectMenu === 2 && <MemberMenuPage memberList={memberList} owner={owner} />}
                {selectMenu === 3 && (
                    selectedMissionId === null ? (
                        <MissionMenuPage setSelectedMissionId={setSelectedMissionId} setSelectedSelectedMissionId={setSelectedSelectedMissionId} setPairId={setPairId} />
                    ) : (
                        <MissionSubmissionPage
                            missionId={selectedMissionId}
                            selectedMissionId = {selectedSelectedMissionId}
                            pairId = {pairId}
                            goBack={goBackToMissionMenu}
                        />
                    )
                )}
            </div>
        </div>
    );
}

export default EventPage;

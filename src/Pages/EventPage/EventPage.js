import React, { useEffect, useState } from 'react';
import Header from '../../util/Layout/Components/Header';
import { eventGetData } from '../../data/event';
import MenuBar from './Components/MenuBar';
import MainMenuPage from './Components/MainMenuPage';
import MemberMenuPage from './Components/MemberMenuPage';
import { memberListGetData } from '../../data/memberList';
import { useParams } from 'react-router-dom';
import { eventAPI } from '../../API/Event';
function EventPage() {

    const [eventInfo, setEventInfo] = useState([eventGetData]);
    const [memberList, ] = useState(memberListGetData);
    const [selectMenu, setSelectMenu] = useState(1);
    const { eventId } = useParams();

    useEffect(() => {
        async function fetchEvent() {
            try {
                // console.log(eventId);
                const response = await eventAPI(eventId);
                if (response) {
                    setEventInfo(response);
                }
            } catch (error) {
                console.error("Failed to fetch event list:", error);
            }
        }

        fetchEvent();
    }, []);
    return (
        <div>
            <Header desc={`${eventInfo?.year}-${eventInfo.semester} ${eventInfo.professor} 교수님`} />
            <MenuBar selectMenu={selectMenu} setSelectMenu={setSelectMenu} code={eventInfo.inviteCode} />
            {
                selectMenu === 1 ? <MainMenuPage /> :
                    selectMenu === 2 ? <MemberMenuPage memberList={memberList.members} /> :
                        // selectMenu === 3 ? <MemberMenuPage memberList={memberList.members} /> :
                null
            }
        </div>
    )
}


export default EventPage;
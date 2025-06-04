import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../util/Layout/Components/Header';
import MenuBar from './Components/MenuBar';
import MainMenuPage from './Components/MainMenuPage';
import MemberMenuPage from './Components/MemberMenuPage';
import MissionMenuPage from './Components/MissionMenuPage';
import MissionSubmissionPage from './Components/MissionSubmissionPage';

import { eventGetData } from '../../data/event';
import { memberListGetData } from '../../data/memberList';
import { eventAPI } from '../../API/Event';

function EventPage() {
  const [selectedMissionId, setSelectedMissionId] = useState(null);
  const [eventInfo, setEventInfo] = useState([eventGetData]);
  const [memberList] = useState(memberListGetData);
  const [selectMenu, setSelectMenu] = useState(1);
  const { eventId } = useParams();

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

    fetchEvent();
  }, []);

  return (
    <div>
      <Header desc={`${eventInfo?.year}-${eventInfo.semester} ${eventInfo.professor} 교수님`} />
      <MenuBar selectMenu={selectMenu} setSelectMenu={setSelectMenu} code={eventInfo.inviteCode} />
      <div className="page">
        {selectMenu === 1 ? (
          <MainMenuPage />
        ) : selectMenu === 2 ? (
          <MemberMenuPage memberList={memberList.members} />
        ) : selectMenu === 3 ? (
          selectedMissionId === null ? (
            <MissionMenuPage setSelectedMissionId={setSelectedMissionId} />
          ) : (
            <MissionSubmissionPage
              missionId={selectedMissionId}
              goBack={goBackToMissionMenu}
            />
          )
        ) : null}
      </div>
    </div>
  );
}

export default EventPage;

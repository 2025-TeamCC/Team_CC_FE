import React, { useState } from "react";
import Header from "../../util/Layout/Components/Header";
import { eventGetData } from "../../data/event";
import MenuBar from "./Components/MenuBar";
import MainMenuPage from "./Components/MainMenuPage";
import MemberMenuPage from "./Components/MemberMenuPage";
import MissionMenuPage from "./Components/MissionMenuPage";
import MissionSubmissionPage from "./Components/MissionSubmissionPage";
import { memberListGetData } from "../../data/memberList";

function EventPage() {
  const [eventInfo] = useState(eventGetData);
  const [memberList] = useState(memberListGetData);
  const [selectMenu, setSelectMenu] = useState(1);
  const [selectedMissionId, setSelectedMissionId] = useState(null);

  const goBackToMissionMenu = () => setSelectedMissionId(null);

  return (
    <div>
      <Header
        desc={`${eventInfo?.year}-${eventInfo.semester} ${eventInfo.professor} 교수님`}
      />
      <MenuBar
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
        code={eventInfo.inviteCode}
      />
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

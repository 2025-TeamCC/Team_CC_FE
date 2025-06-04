import React, { useState } from "react";
import Header from "../../util/Layout/Components/Header";
import { eventGetData } from "../../data/event";
import MenuBar from "./Components/MenuBar";
import MainMenuPage from "./Components/MainMenuPage";
import MemberMenuPage from "./Components/MemberMenuPage";
import MissionMenuPage from "./Components/MissionMenuPage";
import { memberListGetData } from "../../data/memberList";
function EventPage() {
  const [eventInfo] = useState(eventGetData);
  const [memberList] = useState(memberListGetData);
  const [selectMenu, setSelectMenu] = useState(1);

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
      {selectMenu === 1 ? (
        <MainMenuPage />
      ) : selectMenu === 2 ? (
        <MemberMenuPage memberList={memberList.members} />
      ) : selectMenu === 3 ? (
        <MissionMenuPage memberList={memberList.members} />
      ) : null}
    </div>
  );
}

export default EventPage;

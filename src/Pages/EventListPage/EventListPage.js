import React, { useState } from 'react';
import Header from "../../util/Layout/Components/Header";
import { Container } from '../../util/Container';
import ButtonList from './Components/ButtonList';
import { EventListGetData } from '../../data/eventList';

import EventRow from './Components/EventRow';

function EventListPage() {

  const [eventList, ] = useState(EventListGetData);
  return (
    <div>
      <Header desc="나의 팀CC 활동 리스트" />
      <Container>
        {/* 생성, 참여 버튼 리스트 */}
        <ButtonList />
        <div>
          {eventList.events.map((event, index) => (
            <EventRow event={event} key={index} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default EventListPage;

import React, { useEffect, useState } from 'react';
import Header from "../../util/Layout/Components/Header";
import { Container } from '../../util/Container';
import ButtonList from './Components/ButtonList';
// import { EventListGetData } from '../../data/eventList';

import EventRow from './Components/EventRow';
import { eventListAPI } from '../../API/Event';
import styled from 'styled-components';

function EventListPage() {

  const [eventList, setEventList] = useState([]);
  
  useEffect(() => {
    async function fetchEventList() {
      try {
        const response = await eventListAPI();
        if (response && response?.events) {
          // console.log(response);
          setEventList(response?.events);
        }
      } catch (error) {
        console.error("Failed to fetch event list:", error);
      }
    }

    fetchEventList();
  }, []);
  return (
    <div>
      <Header desc="나의 팀CC 활동 리스트" />
      <Container>
        {/* 생성, 참여 버튼 리스트 */}
        <ButtonList />
        <div>
        {
          eventList === undefined ? (
            <p>데이터를 불러오는 중입니다...</p>
          ) : eventList.length === 0 ? (
            <EmptyContainer>
              <p>아직 참여한 팀CC 활동이 없습니다.</p>
              <Img src = "/Img/empty.png" alt = "empty logo"/>
            </EmptyContainer>
            
          ) : (
            eventList.map((event, index) => (
              <EventRow event={event} key={index} />
            ))
          )
        }
      </div>
      </Container>
    </div>
  );
}


const EmptyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  box-sizing: border-box;
`
const Img = styled.img`
  margin-top: 50px;
  width: 80px;
`;
export default EventListPage;

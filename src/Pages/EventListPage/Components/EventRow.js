import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { RowContainer } from "../../../util/Container";

function EventRow({ event }) {
    return (
        <Link to={`/event/${event.eventId}`}>
            <EventRowContainer>
                <InfoContainer>
                    <Status $color = {event.isFinished}>{event.isFinished ? '종료됨' : '진행 중'}</Status>
                    <Info>{event.year}년 {event.semester}학기</Info>
                    <Professor $name={event.professor}>{event.professor} 교수님</Professor>
                </InfoContainer>
                <div>
                    <EventImg src = "/Img/eventTemp.png" alt = "event room image"/>
                </div>
            </EventRowContainer>
            <HR/>
        </Link>
    )
}

export default EventRow;

EventRow.propTypes = {
    event: PropTypes.shape({
        eventId: PropTypes.string,
        year: PropTypes.string,
        semester: PropTypes.number,
        professor: PropTypes.string,
        isFinished: PropTypes.bool
    }).isRequired
};


const EventRowContainer = styled(RowContainer)`
    padding : 20px 0px;

    transition: opacity 0.3s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.5;
        }
    }
`;

const InfoContainer = styled.div`
    width: 100%;
`;
const Status = styled.div`
    display: inline-block;
    background-color: ${({ $color, theme }) =>
        $color ? theme.bgcolors.red : theme.bgcolors.primary};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: 3px 7px;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const Info = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color : ${({ theme }) => theme.colors.black};
    margin-bottom: 10px;
`;

const Professor = styled.div`
    color: ${({ $name }) => getColorFromName($name)};
    font-size: ${({ theme }) => theme.fontSizes.base};
`;

const EventImg = styled.img`
    width: 70px;
    height : 70px;
`

const HR = styled.hr`
    width: 100%;
    color : ${({ theme }) => theme.bgcolors.gray};
    opacity: 0.5;
`;

const COLORS = [
    '#FF6B6B', // 빨강
    '#6BCB77', // 초록
    '#4D96FF', // 파랑
    '#FFC300', // 노랑
    '#FF7F50', // 주황
    '#A566FF', // 보라
    '#00C49A', // 청록
];

// 해시 함수
const getColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % COLORS.length;
    return COLORS[index];
};
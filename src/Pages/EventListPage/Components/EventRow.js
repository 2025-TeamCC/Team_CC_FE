import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { RowContainer } from "../../../util/Container";

function EventRow({event}) {
    return (
        <Link to={`/event/${event.eventId}`}>
            <EventRowContainer>
                <InfoContainer>
                    <Status $color = {event.isFinished}>{event.isFinished ? '종료됨' : '진행 중'}</Status>
                    <Info>{event.year}년 {event.semester}학기</Info>
                    <Professor>{event.professor} 교수님</Professor>
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
    &:hover{
        opacity: 0.5;
    }
`;

const InfoContainer = styled.div`
    width: 100%;
`;
const Status = styled.div`
    display: inline-block;
    background-color: ${({ $color, theme }) =>
        $color ? theme.bgcolors.primary : theme.bgcolors.red};
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
    font-size: ${({theme}) => theme.fontSizes.base};
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
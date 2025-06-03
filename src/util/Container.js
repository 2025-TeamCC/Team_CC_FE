import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin : 0 auto;
    width: 100%;
    max-width: ${({ theme }) => theme.maxWidth};

    box-sizing: border-box;
    padding : 0px ${({ theme }) => theme.spacing.px8};

`

export const RowContainer = styled.div`
    display: flex;
    margin : 0 auto;
    width: 100%;
    flex-direction: row;
`;
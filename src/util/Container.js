import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin : 0 auto;
    width: 100%;
    max-width: ${({ theme }) => theme.maxWidth};
`

export const RowContainer = styled(Container)`
    flex-direction: row;
`;
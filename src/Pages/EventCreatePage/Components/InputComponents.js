import styled from "styled-components";

export const InputLabel = styled.p`
    width: 100%;
    color : ${({ theme }) => theme.colors.black};
    font-weight: bold;
    margin-bottom: 10px;
`;

export const Input = styled.input`
    width: 100%;
    height : 40px;
    border-radius: 5px;
    border : none;
    background-color: ${({ theme }) => theme.bgcolors.boldGray};
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding-left: 5px;
    box-sizing: border-box;
    color : ${({ theme }) => theme.colors.black};
    
    
    outline : none;
    transition: box-shadow 0.5s ease-in-out;

    &:focus {
        outline: 1px solid ${({ theme }) => theme.bgcolors.primary};
        box-shadow: 0 0 5px ${({ theme }) => theme.bgcolors.primary};
    }

    &[type="date"] {
        appearance: none;
        -webkit-appearance: none;
    }

    &[type="date"]::-webkit-date-and-time-value {
        text-align: left;
    }
`;

export const InputButton = styled.button`
    width: 100%;
    height : 40px;
    border-radius: 5px;
    background-color: ${({ $isActive, theme }) => $isActive ? theme.bgcolors.primary : theme.bgcolors.boldGray};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ $isActive, theme }) => $isActive ? theme.colors.white : theme.colors.black};
    border : none;

    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    box-shadow: ${({ $isActive, theme }) => $isActive ? `0 0 8px ${theme.bgcolors.primary}` : 'none'};


`;

export const InputButtonRow = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
`;

export const SubmitButton = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: bold;
    margin-top: 40px;
    border: none;

    background-color: ${({ disabled, theme }) =>
        disabled ? theme.bgcolors.boldGray : theme.bgcolors.primary};
    color: ${({ disabled, theme }) =>
        disabled ? theme.colors.black : theme.colors.white};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

export const InputRow = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;
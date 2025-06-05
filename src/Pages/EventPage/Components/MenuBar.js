import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import AlertModal from "../../../util/modal/AlertModal";


function MenuBar({selectMenu, setSelectMenu, code, isPaired}) {

    const [isModalCopy, setIsModalCopy] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setIsModalCopy(true);
            })
            .catch(() => {
                alert("복사에 실패했습니다. 브라우저 설정을 확인해주세요.");
            });
    };

    return (
        <MenuBarContainer>
            <MenuList>
                <MenuItem $isActive = {selectMenu === 1} onClick={() => setSelectMenu(1)}>메인</MenuItem>
                <MenuItem $isActive={selectMenu === 2} onClick={() => setSelectMenu(2)}>멤버</MenuItem>
                {
                    isPaired === 'DONE' && <MenuItem $isActive={selectMenu === 3} onClick={() => setSelectMenu(3)}>미션</MenuItem>
                }
            </MenuList>
            <CodeCopyContainer onClick={handleCopy}>
                <CodeCopySpan>참여 코드</CodeCopySpan>
                <CopyImage src = "/Img/copy.png" alt = "copy image"/>
            </CodeCopyContainer>

            {
                isModalCopy && <AlertModal
                    title="참여 코드가 복사되었습니다!"
                    desc="복사한 코드를 공유해주세요!"
                    onClose={() => {    
                        setIsModalCopy(false);
                    }}
                />
            }
        </MenuBarContainer>
    )
}

export default MenuBar;

MenuBar.propTypes = {
    selectMenu: PropTypes.number.isRequired,
    setSelectMenu: PropTypes.func.isRequired,
    code: PropTypes.string.isRequired,
    isPaired : PropTypes.bool.isRequired
};

const MenuBarContainer = styled.div`
    width : 100%;
    background-color:${({ theme }) => theme.bgcolors.gray};

    display: flex;
    justify-content: space-between;
    padding : ${({ theme }) => theme.spacing.px8};
    box-sizing: border-box;
`;

const MenuList = styled.div`
    display: flex;
    align-items: center;
`;

const MenuItem = styled.div`
    margin-right: 20px;
    padding: 3px 0;
    cursor: pointer;
    position: relative;
    font-weight: bold;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: ${({ theme }) => theme.colors.primary};
        transform: scaleX(${props => (props.$isActive ? 1 : 0)});
        transform-origin: center;
        transition: transform 0.3s ease;
    }
`;

const CodeCopyContainer = styled.div`
    display: flex;
    align-items: center;

    transition: opacity 0.3s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.5;
        }
    }
`;

const CodeCopySpan = styled.p`
    color : ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    margin-right: 5px;
`;

const CopyImage = styled.img`
    width: 20px;
    height : 20px;
`; 
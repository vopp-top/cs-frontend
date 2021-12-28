import router from "next/router";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
import { MONTH_TLC } from "../../constants/currentMonth";
import Icon from "../Icon";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const NavBarSelection: React.FC<Props> = () => {
  const options = ["Top Users", "Top Streamers", "Top Emotes"];
  const [active, setActive] = useState(false);

  return (
    <Dropdown>
      <OutsideClickHandler
        display="inline"
        onOutsideClick={() => setActive(false)}
      >
        <Button
          onClick={() => {
            setActive(!active);
          }}
        >
          <Icon mr={"0.6rem"} as={FaCaretDown} />
          Leaderboards
        </Button>
        {active && (
          <Content>
            {options.map((option, i) => (
              <Item
                key={i}
                onClick={() => {
                  const split = option.toLowerCase().split(" ");
                  router.push(`/leaderboards/${split[1]}/${MONTH_TLC}`);
                  setActive(!active);
                }}
              >
                {option}
              </Item>
            ))}
          </Content>
        )}
      </OutsideClickHandler>
    </Dropdown>
  );
};

export default NavBarSelection;

// Styled ------------------------------------------------------------------------

const Dropdown = styled.div`
  position: relative;
  z-index: 999;
  background-color: #121212;
  border-radius: ${({ theme }) => theme.rounded.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  height: 100%;
  cursor: pointer;
  user-select: none;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: 0 1.2rem;
  justify-content: space-between;
`;

const Content = styled.div`
  padding: 0 1.2rem;
  border-radius: ${({ theme }) => theme.rounded.md};
  background-color: ${({ theme }) => theme.colors.main};
  margin-top: 10px;
  top: 100%;
  position: absolute;
  width: 100%;
`;

const Item = styled.div`
  padding: 1rem 0;
`;

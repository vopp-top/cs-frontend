import Router from "next/router";
import React, { MouseEvent, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
import { AVAILABLE_MONTHS } from "../../../constants/currentMonth";
import Icon from "../../Icon";
import { SearchTypes } from "../Users/SearchLeaderboard";
// Types -------------------------------------------------------------------------

interface Props {
  type: SearchTypes;
}

// Component ---------------------------------------------------------------------
const MonthSelection: React.FC<Props> = ({ type }) => {
  const router = Router;
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
          {AVAILABLE_MONTHS[0]}
          <Icon as={FaCaretDown} />
        </Button>
        {active && (
          <Content>
            {AVAILABLE_MONTHS.map((option, i) => (
              <Item
                key={i}
                onClick={() => {
                  const split = option.toLowerCase().split(" ");
                  const url = split[0] + split[1].slice(-2);
                  router.push(`/leaderboards/${type}/${url}`);
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

export default MonthSelection;

// Styled ------------------------------------------------------------------------

const Dropdown = styled.div`
  z-index: 1111;
  width: 200px;
  background-color: #121212;
  border-radius: ${({ theme }) => theme.rounded.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  height: 100%;
  cursor: pointer;
  user-select: none;

  &.div {
    height: 100%;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1.2rem;
  justify-content: space-between;
`;

const Content = styled.div`
  padding: 0 1.2rem;
  border-radius: ${({ theme }) => theme.rounded.md};
  background-color: #121212;
  margin-top: 6px;
`;

const Item = styled.div`
  padding: 1rem 0;
`;

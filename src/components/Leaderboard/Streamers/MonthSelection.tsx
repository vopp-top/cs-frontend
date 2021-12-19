import Router from "next/router";
import React, { MouseEvent, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
import Icon from "../../Icon";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const MonthSelection: React.FC<Props> = () => {
  const router = Router;
  const options = ["November 2021", "October 2021"];
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
          {options[0]}
          <Icon as={FaCaretDown} />
        </Button>
        {active && (
          <Content>
            {options.map((option) => (
              <Item
                onClick={() => {
                  const split = option.toLowerCase().split(" ");
                  const url = split[0] + split[1].slice(-2);
                  console.log(url);
                  router.push(`/leaderboards/streamers/${url}`);
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
  z-index: 999;
  width: 350px;
  background-color: #121212;
  border-radius: ${({ theme }) => theme.rounded.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  height: 100%;
  cursor: pointer;
  user-select: none;
  color: #ffffff80;

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
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Router, { useRouter } from "next/router";
import React, { MouseEvent, useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
import { AVAILABLE_MONTHS } from "../../../constants/currentMonth";
import { useMonth } from "../../../contexts/global.context";
import Icon from "../../Icon";
import { SearchTypes } from "../Users/SearchLeaderboard";
// Types -------------------------------------------------------------------------

interface Props {
  type: SearchTypes;
}

// Component ---------------------------------------------------------------------
const MonthSelection: NextPage<Props> = ({ type }) => {
  const { months, month } = useMonth();
  const { month: d } = useRouter().query;
  const router = Router;
  const [active, setActive] = useState(false);

  return (
    <Dropdown>
      {months ? (
        <OutsideClickHandler
          display="inline"
          onOutsideClick={() => setActive(false)}
        >
          <Button
            onClick={() => {
              setActive(!active);
            }}
          >
            {months.find((m) => m.id === d)?.name || month.name}
            <Icon as={FaCaretDown} />
          </Button>
          {active && (
            <Content>
              {months.map((m, i) => (
                <Item
                  key={i}
                  onClick={() => {
                    router.push(`/leaderboards/${type}/${m.id}`);
                    setActive(!active);
                  }}
                >
                  {m.name}
                </Item>
              ))}
            </Content>
          )}
        </OutsideClickHandler>
      ) : (
        <p>loading</p>
      )}
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

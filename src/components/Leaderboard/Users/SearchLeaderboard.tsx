import router from "next/router";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaExclamationTriangle, FaSearch } from "react-icons/fa";
import styled, { css } from "styled-components";
import Icon from "../../Icon";
// Types -------------------------------------------------------------------------

export type SearchTypes = "users" | "emotes" | "streamers";

interface Props {
  gotoPage: any;
  type: SearchTypes;
}

// Component ---------------------------------------------------------------------
const SearchUser: React.FC<Props> = ({ gotoPage, type }) => {
  const [err, setErr] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (cooldown) return;
    setErr(false);

    if (e.key === "Enter") {
      const val = e.currentTarget.value.toLowerCase();
      const res = await fetch(`https://capi.vopp.top/${type}/${val}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));

      if (!res || res.code === 404) setErr(true);

      setCooldown(true);
      gotoPage(res.page_index);
    }
  };

  useEffect(() => {
    if (!cooldown) return;
    const myInterval = setInterval(() => setCooldown(false), 500);

    return () => clearInterval(myInterval);
  }, [cooldown]);

  console.log(type.slice(type.length - 1));
  return (
    <Wrapper err={err}>
      <Input
        type={"search"}
        placeholder={`Search for ${type.slice(0, -1)}`}
        onKeyDown={handleKeyDown}
      />
      <Icon
        textColor={"inherit"}
        ml={2}
        as={err ? FaExclamationTriangle : FaSearch}
      />
    </Wrapper>
  );
};

export default SearchUser;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div<{ err: boolean }>`
  background-color: ${({ theme }) => theme.colors.subHover};
  border-radius: ${({ theme }) => theme.rounded.sm};
  border: 2px solid transparent;
  overflow: hidden;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  min-width: 300px;
  width: 300px;
  transition: 150ms ease;

  ${({ err }) =>
    err &&
    css`
      border-color: ${({ theme }) => theme.colors.error};
      color: ${({ theme }) => theme.colors.error};
    `}
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

import router from "next/router";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaExclamationTriangle, FaSearch } from "react-icons/fa";
import styled, { css } from "styled-components";
import Icon from "../../Icon";
// Types -------------------------------------------------------------------------

export type SearchTypes = "users" | "emotes" | "streamers";

interface Props {
  gotoPage?: any;
  type: SearchTypes;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  setErr: React.Dispatch<React.SetStateAction<boolean>>;
  err: boolean;
}

// Component ---------------------------------------------------------------------
const SearchUser: React.FC<Props> = ({ type, setQuery, err, setErr }) => {
  const [val, setVal] = useState("");

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setErr(false);
    setVal(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const myInterval = setInterval(() => setQuery(val), 350);
    return () => clearInterval(myInterval);
  }, [val]);

  return (
    <Wrapper err={err}>
      <Input
        type={"search"}
        placeholder={`Search for ${type.slice(0, -1)}`}
        onChange={handleChange}
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
  border-radius: ${({ theme }) => theme.rounded.md};
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

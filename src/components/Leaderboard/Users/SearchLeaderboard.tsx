import router from "next/router";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaAdjust, FaExclamationTriangle, FaSearch } from "react-icons/fa";
import Loader from "react-loader-spinner";
import { SpinnerCircular } from "spinners-react";
import styled, { css } from "styled-components";
import { theme } from "../../../themes/theme";
import Icon from "../../Icon";
// Types -------------------------------------------------------------------------

export type SearchTypes = "users" | "emotes" | "streamers";

interface Props {
  gotoPage?: any;
  type: SearchTypes;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  setErr: React.Dispatch<React.SetStateAction<boolean>>;
  err: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component ---------------------------------------------------------------------
const SearchLeaderboard: React.FC<Props> = ({
  type,
  setQuery,
  err,
  setErr,
  loading,
  setLoading,
  gotoPage,
}) => {
  const [val, setVal] = useState("");

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setErr(false);
    setLoading(true);
    gotoPage(0);
    setVal(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      setQuery(val);
    }, 350);
    return () => clearInterval(myInterval);
  }, [val]);

  return (
    <Wrapper err={err}>
      <Input
        type={"search"}
        placeholder={`Search for ${type.slice(0, -1)}`}
        onChange={handleChange}
      />
      <IconCont>
        {loading ? (
          <SpinnerCircular
            size={20}
            color={theme.colors.text}
            thickness={250}
            secondaryColor={theme.colors.sub}
          />
        ) : (
          <Icon
            textColor={"inherit"}
            ml={2}
            as={!err ? FaSearch : FaExclamationTriangle}
          />
        )}
      </IconCont>
    </Wrapper>
  );
};

export default SearchLeaderboard;

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

const IconCont = styled.div`
  svg {
    display: block;
  }
`;

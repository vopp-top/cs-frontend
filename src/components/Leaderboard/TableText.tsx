import React from "react";
import styled from "styled-components";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {
  text: string;
  emote?: string;
}

// Component ---------------------------------------------------------------------
const TableText: React.FC<Props> = ({ text, emote }) => {
  if (emote && text.length > 20) text = text.slice(0, 16) + "...";

  return (
    <Wrapper id={text}>
      {emote && (
        <Emote aria-label={emote}>
          <img src={emote} alt={text} />
        </Emote>
      )}
      <Text as={"span"}>{text}</Text>
    </Wrapper>
  );
};

export default TableText;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-family: Roboto, sans-serif;
`;

const Emote = styled.div`
  display: flex;

  img {
    position: relative;
    border: none;
    max-width: 100%;
    margin-right: 1ch;
  }
`;

import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  text: string;
}

// Component ---------------------------------------------------------------------
const TableText: React.FC<Props> = ({ children, text }) => {
  return (
    <Wrapper>
      {children && <Emote>{children}</Emote>}
      <Overflow>{text}</Overflow>
    </Wrapper>
  );
};

export default TableText;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.span`
  width: 100%;
  word-wrap: break-word;
  vertical-align: baseline;
`;

const Emote = styled.div`
  vertical-align: middle;
  display: inline;

  img {
    position: relative;
    border: none;
    max-width: 100%;
    vertical-align: middle;
    margin-right: 1ch;
    display: inline;
  }
`;

const Overflow = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

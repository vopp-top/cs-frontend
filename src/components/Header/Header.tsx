import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: React.FC<Props> = () => {
  return (
    <Wrapper>
      <h1>header</h1>
    </Wrapper>
  );
};

export default Header;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

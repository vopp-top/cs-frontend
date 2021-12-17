import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

export default Layout;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: auto;
`;

import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { device } from "../themes/theme";
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
  padding: 0 72px;
  padding-bottom: 72px;
  width: 100%;
  margin: auto;

  @media screen and (min-width: 1440px) {
    /* background-color: aliceblue; */
    max-width: 1440px;
  }

  @media screen and (max-width: 1440px) {
    /* background-color: pink; */
    max-width: 1330px;
  }

  @media screen and (max-width: 1330px) {
    /* background-color: pink; */
    max-width: 1220px;
  }
`;

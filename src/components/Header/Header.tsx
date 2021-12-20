import React from "react";
import styled from "styled-components";
import Logo from "../Logo";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Logo />
      <SearchBar />
      <NavBar />
    </Wrapper>
  );
};

export default Header;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 50px 0;
  display: flex;
  justify-content: space-between;
`;

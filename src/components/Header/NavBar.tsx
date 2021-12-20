import React from "react";
import { FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import Icon from "../Icon";
import Text from "../Text";
import NavBarSelection from "./NavBarSelection";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const NavBar: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Box>
        <NavBarSelection />
      </Box>
    </Wrapper>
  );
};

export default NavBar;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

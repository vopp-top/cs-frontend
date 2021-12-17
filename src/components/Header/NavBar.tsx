import React from "react";
import { FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import Icon from "../Icon";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const NavBar: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Box>
        <Icon mr={1} as={FaCaretDown} />
        <Text fontSize={"md"}>Leaderboards</Text>
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
  display: flex;
  align-items: center;
`;

import React from "react";
import styled from "styled-components";
import Text from "./Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Heading: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Text textColor={"main"} fontSize={"xxxl"} fontWeight={500}>
        {children}
      </Text>
    </Wrapper>
  );
};

export default Heading;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  height: 275px;
  background-color: ${({ theme }) => theme.colors.sub};
  display: flex;
  justify-content: center;
  align-items: center;
`;

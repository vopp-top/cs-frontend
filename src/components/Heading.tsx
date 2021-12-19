import React from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
import Text from "./Text";
// Types -------------------------------------------------------------------------

interface Props extends ColorProps, SpaceProps {}

// Component ---------------------------------------------------------------------
const Heading: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Text textColor={"inherit"} fontSize={"xxxl"} fontWeight={500}>
        {children}
      </Text>
    </Wrapper>
  );
};

export default Heading;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div<Props>`
  width: 100%;
  height: 275px;
  background-color: ${({ theme }) => theme.colors.sub};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;

  ${space}
  ${color}
`;

Wrapper.defaultProps = {
  textColor: "white",
  mb: "160px",
};

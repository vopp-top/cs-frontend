import React from "react";
import { FaLink } from "react-icons/fa";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
import Icon from "./Icon";
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
  height: 225px;
  background-color: ${({ theme }) => theme.colors.sub};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  transition: 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.subHover};
  }

  ${space}
  ${color}
`;

Wrapper.defaultProps = {
  textColor: "white",
};

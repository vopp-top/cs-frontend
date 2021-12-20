import React from "react";
import styled from "styled-components";
import {
  height,
  HeightProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

interface Props extends ColorProps, SpaceProps, HeightProps, TypographyProps {}

// Component ---------------------------------------------------------------------
const Button: React.FC<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Button;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.button<Props>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.sub};
  border-radius: ${({ theme }) => theme.rounded.sm};
  cursor: pointer;
  transition: 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.subHover};
  }

  ${color}
  ${space}
  ${height}
  ${typography}
`;

Wrapper.defaultProps = {
  textColor: "main",
  fontSize: "sm",
  height: "50px",
};

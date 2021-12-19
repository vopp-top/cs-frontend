import React from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

interface Props extends ColorProps, SpaceProps {}

// Component ---------------------------------------------------------------------
const Button: React.FC<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Button;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.button<Props>`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.sub};
  border-radius: ${({ theme }) => theme.rounded.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;

  ${color}
  ${space}
`;

Wrapper.defaultProps = {
  textColor: "main",
};

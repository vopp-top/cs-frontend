import React from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

interface Props extends ColorProps, SpaceProps {}

// Component ---------------------------------------------------------------------
const Button: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Button;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.button<Props>`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.sub};
  border-radius: ${({ theme }) => theme.rounded.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;

  ${color}
  ${space}
`;

Wrapper.defaultProps = {
  textColor: "main",
};

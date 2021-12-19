import React from "react";
import styled from "styled-components";
import { space, SpaceProps, typography, TypographyProps } from "styled-system";
import { ThemeProps } from "../themes/theme";
import { color, ColorProps } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

interface Props extends SpaceProps, TypographyProps, ColorProps {
  as?: any;
}

// Component ---------------------------------------------------------------------
const Text: React.FC<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Text;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.p<Props>`
  ${space}
  ${typography}
  ${color}
`;

Wrapper.defaultProps = {
  textColor: "inherit",
  fontSize: "md",
  fontWeight: "inherit",
};

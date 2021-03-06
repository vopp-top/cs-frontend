import React, { DOMAttributes } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";
import { size, SizeProps, space, SpaceProps } from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

interface Props
  extends SizeProps,
    SpaceProps,
    DOMAttributes<HTMLDivElement>,
    ColorProps {}

// Component ---------------------------------------------------------------------
const Icon: React.FC<Props & { as: IconType | null }> = ({ as, ...props }) => {
  if (!as) return null;
  return <Wrapper {...props}>{React.createElement(as)}</Wrapper>;
};

export default Icon;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div<Props>`
  display: flex;
  cursor: pointer;
  transition: 50ms ease;

  ${size}
  ${space}
  ${color}

  svg {
    width: 100%;
    height: 100%;
    color: currentColor;
  }
`;

Wrapper.defaultProps = {
  size: 20,
  textColor: "inherit",
};

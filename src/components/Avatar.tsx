import React from "react";
import styled from "styled-components";
import { size, SizeProps, space, SpaceProps } from "styled-system";
// Types -------------------------------------------------------------------------

interface Props extends SizeProps, SpaceProps {
  url: string;
}

// Component ---------------------------------------------------------------------
const Avatar: React.FC<Props> = ({ ...props }) => {
  return <Wrapper {...props}></Wrapper>;
};

export default Avatar;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div<Props>`
  ${space}
  ${size}

  cursor: pointer;
  border-radius: 10%;
  background-size: cover;
  background-position: 50%;
  background-image: url(${({ url }) => url});
`;

Wrapper.defaultProps = {
  size: 44,
};

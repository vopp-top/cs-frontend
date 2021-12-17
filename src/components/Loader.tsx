import React from "react";
import styled from "styled-components";
import Load from "react-loader-spinner";
import { theme } from "../themes/theme";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Loader: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Load height={20} color={theme.colors.main} type="ThreeDots" />
    </Wrapper>
  );
};

export default Loader;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  height: 275px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

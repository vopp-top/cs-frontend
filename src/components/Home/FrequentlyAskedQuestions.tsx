import React from "react";
import styled from "styled-components";
import Heading from "../Heading";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const FrequentlyAskedQuestions: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Heading>Frequently asked Questions</Heading>
    </Wrapper>
  );
};

export default FrequentlyAskedQuestions;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

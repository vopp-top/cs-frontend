import React from "react";
import styled from "styled-components";
import FrequentlyAskedQuestions from "../components/Home/FrequentlyAskedQuestions";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const FaqPage: React.FC<Props> = () => {
  return <FrequentlyAskedQuestions />;
};

export default FaqPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

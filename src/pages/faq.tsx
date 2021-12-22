import React from "react";
import styled from "styled-components";
import Heading from "../components/Heading";
import FrequentlyAskedQuestions from "../components/Home/FrequentlyAskedQuestions";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const FaqPage: React.FC<Props> = () => {
  return (
    <>
      <Heading textColor={"main"} mt={"50px"} mb={"25px"}>
        Frequently asked Questions
      </Heading>
      <FrequentlyAskedQuestions />
    </>
  );
};

export default FaqPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

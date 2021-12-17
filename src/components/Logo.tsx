import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Text from "./Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Logo: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Image src="/logo.svg" width="50" height="50" />
      <Text ml={2} fontSize={"xl"} fontWeight={500}>
        chat.vopp.top
      </Text>
    </Wrapper>
  );
};

export default Logo;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

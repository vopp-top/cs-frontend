import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Text from "./Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Logo: React.FC<Props> = () => {
  return (
    <Link href={"/"}>
      <Wrapper>
        <Image src="/logo.svg" width="45" height="45" />
        <Text ml={2} fontSize={"xl"} fontWeight={500}>
          chat.vopp.top
        </Text>
      </Wrapper>
    </Link>
  );
};

export default Logo;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

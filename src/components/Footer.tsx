import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";
import Icon from "./Icon";
import Text from "./Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Footer: React.FC<Props> = () => {
  return (
    <Wrapper>
      <a
        target={"_blank"}
        rel="noreferrer"
        href={"https://github.com/vopp-top"}
      >
        <Box>
          <Icon as={FaGithub} mr={2} />
          GitHub
        </Box>
      </a>
      <Text fontSize={"xs"}>chat.vopp.top is not affiliated with Twitch.</Text>
      <Link href={"/privacy_policy"}>
        <Box>Privacy Policy</Box>
      </Link>
    </Wrapper>
  );
};

export default Footer;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  margin-top: 72px;
  border-top: 1px solid ${({ theme }) => theme.colors.subHover};
  color: ${({ theme }) => theme.colors.textSub};
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  a {
    color: ${({ theme }) => theme.colors.textSub};
    text-decoration: none;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

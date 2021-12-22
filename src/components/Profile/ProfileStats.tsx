import React from "react";
import styled from "styled-components";
import { Streamer } from "../../types/types";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {
  data: Streamer;
}

// Component ---------------------------------------------------------------------
const ProfileStats: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Item>
        <Count>{data.videos_count.toLocaleString()}</Count>
        <Text>total vods analyzed</Text>
      </Item>
      <Item>
        <Count>{data.messages_count.toLocaleString()}</Count>
        <Text>total messages count</Text>
      </Item>
      <Item>
        <Count>{data.emotes_count.toLocaleString()}</Count>
        <Text>total emotes count</Text>
      </Item>
      <Item>
        <Count>{data.time_count.toLocaleString()}</Count>
        <Text textAlign={"center"}>
          total stream time
          <br />
          <Text as={"span"} fontSize={"xxs"}>
            in seconds
          </Text>
        </Text>
      </Item>
    </Wrapper>
  );
};

export default ProfileStats;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  height: 350px;
  padding: 4rem 0;
  display: grid;
  grid-gap: 4rem;
  grid-template-rows: auto;
  grid-auto-flow: column;

  p {
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSub};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Item = styled.div`
  background-color: ${({ theme }) => theme.colors.subHover};
  border-radius: ${({ theme }) => theme.rounded.lg};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Count = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.main};
  font-weight: 500;
`;

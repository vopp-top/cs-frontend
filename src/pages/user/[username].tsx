import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaLink, FaTwitch } from "react-icons/fa";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import Heading from "../../components/Heading";
import Icon from "../../components/Icon";
import Text from "../../components/Text";
import { Streamer } from "../../types/types";
// Types -------------------------------------------------------------------------

interface Props {}

// fetch streamer
const getData = async (user: any): Promise<Streamer> => {
  const res = await fetch(`/streamers/${user}/index.json`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res) return res;
  return res.json();
};

// Component ---------------------------------------------------------------------
const UserPage: React.FC<Props> = () => {
  const { username } = useRouter().query;
  const [user, setUser] = useState<Streamer | null>(null);

  useEffect(() => {
    if (!username) return;
    getData((username as string).toLowerCase())
      .then((res) => setUser(res))
      .catch(() => setUser(null));
  }, [username]);

  if (!user) return <Loader type="TailSpin" />;
  return (
    <Wrapper>
      <Heading>{user.name}</Heading>
      <Info>
        <a target={"_blank"} href={`https://www.twitch.tv/${user.name}`}>
          <Avatar url={user.avatar} size={160} />
        </a>
        <Socials>
          <Icon mr={2} as={FaTwitch} size={18} textColor={"main"} />
          <a target="_blank" href={`https://www.twitch.tv/${user.name}`}>
            <Text fontSize={"sm"}>twitch.tv/{user.name}</Text>
          </a>
        </Socials>
      </Info>
    </Wrapper>
  );
};

export default UserPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: relative;
`;

const Info = styled.div`
  position: absolute;
  left: 75px;
  bottom: -80px;
`;

const Socials = styled.div`
  position: absolute;
  left: 100%;
  bottom: 0;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 32px;
`;

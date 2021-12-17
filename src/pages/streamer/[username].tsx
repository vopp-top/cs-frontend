import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaTwitch } from "react-icons/fa";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import Heading from "../../components/Heading";
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import ProfileTopEmotesLeaderboard from "../../components/Profile/ProfileTopEmotesLeaderboard";
import TopUsersLeaderboard from "../../components/Profile/ProfileTopUsersLeaderboard";
import Text from "../../components/Text";
import { Emote, Streamer, User } from "../../types/types";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Profile: NextPage<Props> = () => {
  const { username } = useRouter().query;
  const [user, setUser] = useState<Streamer | undefined | null>(undefined);
  const [users, setUsers] = useState<User[]>([]);
  const [emotes, setEmotes] = useState<Emote[]>([]);

  // fetch streamer
  const fetchData = async () => {
    setUser(undefined);

    const userRes = await axios
      .get(`/__streamers__/${username}/index.json`)
      .catch((err) => console.log(err));
    if (!userRes) return setUser(null);

    const usersRes = await axios.get(
      `/__streamers__/${username}/top_users_0.json`
    );
    const emotesRes = await axios.get(
      `/__streamers__/${username}/top_emotes_0.json`
    );

    setUsers(usersRes.data.users);
    setEmotes(emotesRes.data.emotes);
    setUser(userRes.data);
  };

  useEffect(() => {
    if (!username) return;
    fetchData();
  }, [username]);

  if (user === undefined) return <Loader />;
  if (user === null)
    return (
      <Text fontWeight={500} fontSize={"md"} textAlign={"center"}>
        Not found
        <img src="https://cdn.betterttv.net/emote/618a7b0c1f8ff7628e6d1d2d/1x" />
      </Text>
    );

  return (
    <Wrapper>
      <HeadingContainer>
        <Heading>{user!.name}</Heading>
        <Info>
          <a target={"_blank"} href={`https://www.twitch.tv/${user!.name}`}>
            <Avatar url={user!.avatar} size={160} />
          </a>
          <Socials>
            <Icon mr={2} as={FaTwitch} size={18} textColor={"main"} />
            <a target="_blank" href={`https://www.twitch.tv/${user!.name}`}>
              <Text fontSize={"sm"}>twitch.tv/{user!.name}</Text>
            </a>
          </Socials>
        </Info>
      </HeadingContainer>
      <Leaderboards>
        <TopUsersLeaderboard users={users} />
        <ProfileTopEmotesLeaderboard emotes={emotes} />
      </Leaderboards>
    </Wrapper>
  );
};

export default Profile;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: relative;
`;

const Leaderboards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10%;
  /* justify-content: space-between; */
`;

const HeadingContainer = styled.div`
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

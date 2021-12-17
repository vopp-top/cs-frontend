import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaTwitch } from "react-icons/fa";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import Heading from "../../components/Heading";
import Icon from "../../components/Icon";
import ProfileTopEmotesLeaderboard from "../../components/Profile/ProfileTopEmotesLeaderboard";
import TopUsersLeaderboard from "../../components/Profile/ProfileTopUsersLeaderboard";
import Text from "../../components/Text";
import { Emote, Streamer, User } from "../../types/types";
// Types -------------------------------------------------------------------------

interface Props {}

// fetch streamer
const getData = async (user: any): Promise<Streamer> => {
  const res = await fetch(`/__streamers__/${user}/index.json`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res) return res;
  return res.json();
};

// Component ---------------------------------------------------------------------
const Profile: React.FC<Props> = () => {
  const { username } = useRouter().query;
  const [user, setUser] = useState<Streamer | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [emotes, setEmotes] = useState<Emote[]>([]);

  // fetch streamer
  const fetchData = async () => {
    const userRes = await axios
      .get(`/__streamers__/${username}/index.json`)
      .catch((err) => console.log(err));

    if (userRes) setUser(userRes.data);

    const usersRes = await axios
      .get(`/__streamers__/${username}/top_users_0.json`)
      .catch((err) => console.log(err));

    if (usersRes) setUsers(usersRes.data.users);

    const emotesRes = await axios.get(
      `/__streamers__/${username}/top_emotes_0.json`
    );

    if (emotesRes) setEmotes(emotesRes.data.emotes);
  };

  useEffect(() => {
    if (!username) return;
    fetchData();
  }, [username]);

  if (!user || users.length === 0 || emotes.length === 0)
    return <Loader type="TailSpin" />;

  return (
    <Wrapper>
      <HeadingContainer>
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

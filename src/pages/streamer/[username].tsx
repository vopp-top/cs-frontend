import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { FaTwitch } from "react-icons/fa";
import styled from "styled-components";
import { server } from "..";
import Avatar from "../../components/Avatar";
import Heading from "../../components/Heading";
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import ProfileStats from "../../components/Profile/ProfileStats";
import ProfileTopEmotesLeaderboard from "../../components/Profile/ProfileTopEmotesLeaderboard";
import ProfileTopUsersLeaderboard from "../../components/Profile/ProfileTopUsersLeaderboard";
import Text from "../../components/Text";
import { Streamer } from "../../types/types";
// Types -------------------------------------------------------------------------

interface Props {
  data: Streamer;
}

// Component ---------------------------------------------------------------------
const Profile: NextPage<Props> = ({ data }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
    };
  }, []);

  if (loading) return <Loader />;
  else if (!data) return <Heading textColor={"error"}>Not found</Heading>;

  return (
    <Wrapper>
      <Head>
        <title>chat.vopp.top | {data.name}</title>
        <meta name="description" content={`Twitch stats for ${data.name}`} />
        <meta property="og:image" content={data.avatar} />
        <meta name="twitter:image" content={data.avatar} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.name} />
      </Head>
      <HeadingContainer>
        <Heading textColor={"main"}>{data.name} </Heading>
        <Info>
          <a
            target={"_blank"}
            rel="noreferrer"
            href={`https://www.twitch.tv/${data.name}`}
          >
            <Avatar url={data.avatar} size={160} />
          </a>
          <Socials>
            <Icon mr={2} as={FaTwitch} size={18} textColor={"main"} />
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.twitch.tv/${data.name}`}
            >
              <Text fontSize={"sm"} textColor={"white"}>
                twitch.tv/{data.name}
              </Text>
            </a>
          </Socials>
        </Info>
      </HeadingContainer>
      <ProfileStats data={data} />
      <Leaderboards>
        <ProfileTopUsersLeaderboard users={data.users} />
        <ProfileTopEmotesLeaderboard emotes={data.emotes} />
      </Leaderboards>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username } = ctx.query;

  const data = await axios
    .post(`https://capi.vopp.top/streamer/${username}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  if (!data) return { props: { data: null } };
  console.log(data);

  return { props: { data } };
};

export default Profile;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: relative;
`;

export const Leaderboards = styled.div`
  display: grid;
  width: 100%;
  max-width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 100px;
`;

const HeadingContainer = styled.div`
  position: relative;
  margin-bottom: 80px;
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

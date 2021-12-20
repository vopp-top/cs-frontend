import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import Button from "../components/Button";
import Heading from "../components/Heading";
import TopEmotesLeaderboard from "../components/Home/TopEmotesLeaderboard";
import TopStreamersLeaderboard from "../components/Home/TopStreamersLeaderboard";
import TopUsersLeaderboard from "../components/Home/TopUsersLeaderboard";
import Loader from "../components/Loader";
import Text from "../components/Text";
import { month } from "../constants/currentMonth";
import { IGlobal } from "../types/types";
import { Leaderboards } from "./streamer/[username]";
// import Head from "next/head";

interface Props {
  data: IGlobal;
}

export const server =
  "undefined" === typeof window ? "http://localhost:3000" : "https://vopp.top";

const Home: NextPage<Props> = ({ data }) => {
  if (!data) return <Loader />;

  return (
    <Wrapper>
      <Heading mb={50}>
        Leaderboard{" "}
        <Text as={"span"} fontWeight={500} fontSize={"lg"} textColor={"main"}>
          /November21
        </Text>
      </Heading>
      <Leaderboards>
        <TopUsersLeaderboard users={data.users} />
        <TopEmotesLeaderboard emotes={data.emotes} />
      </Leaderboards>
      <Link href={`/leaderboards/streamers/${month()}`}>
        <Heading mt={50} mb={0}>
          Top Streamers{" "}
          <Text as={"span"} fontWeight={500} fontSize={"lg"} textColor={"main"}>
            /November21
          </Text>
        </Heading>
      </Link>
      <TopStreamersLeaderboard controlls={false} streamers={data.streamers} />
      <Link href={`/leaderboards/streamers/${month()}`}>
        <Button height={50} fontSize={"md"}>
          Full Leaderboard
        </Button>
      </Link>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await fetch(`${server}/static/${month()}/global/index.json`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return { props: { data } };
};

export default Home;

const Wrapper = styled.div``;

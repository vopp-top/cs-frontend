import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Button from "../components/Button";
import Heading from "../components/Heading";
import FrequentlyAskedQuestions from "../components/Home/FrequentlyAskedQuestions";
import TopEmotesLeaderboard from "../components/Home/TopEmotesLeaderboard";
import TopStreamersLeaderboard from "../components/Home/TopStreamersLeaderboard";
import TopUsersLeaderboard from "../components/Home/TopUsersLeaderboard";
import Loader from "../components/Loader";
import Text from "../components/Text";
import { useMonth } from "../contexts/global.context";
import { IGlobal } from "../types/types";
import { Leaderboards } from "./streamer/[username]";
// import Head from "next/head";

interface Props {
  data: IGlobal;
}

export const server =
  "undefined" === typeof window ? "http://localhost:3000" : "https://vopp.top";

const Home: NextPage<Props> = ({ data }) => {
  const { month } = useMonth();
  console.log(month.id);
  if (!data) return <Loader />;

  return (
    <Wrapper>
      <Head>
        <title>chat.vopp.top | Home</title>
      </Head>
      <Heading mb={50}>
        Leaderboard{" "}
        <Text as={"span"} fontWeight={500} fontSize={"lg"} textColor={"main"}>
          /{month.name}
        </Text>
      </Heading>
      <Leaderboards>
        <TopUsersLeaderboard users={data.users} />
        <TopEmotesLeaderboard emotes={data.emotes} />
      </Leaderboards>
      <Link href={`/leaderboards/streamers/${month.id}`}>
        <a>
          <Heading mt={50} mb={50}>
            Top Streamers{" "}
            <Text
              as={"span"}
              fontWeight={500}
              fontSize={"lg"}
              textColor={"main"}
            >
              /{month.name}
            </Text>
          </Heading>
        </a>
      </Link>
      <TopStreamersLeaderboard controlls={false} streamers={data.streamers} />
      <Link href={`/leaderboards/streamers/${month.id}`}>
        <a>
          <Button height={50} fontSize={"md"}>
            Full Leaderboard
          </Button>
        </a>
      </Link>
      <Heading mt={"50px"} mb={"25px"}>
        Frequently asked Questions
      </Heading>
      <FrequentlyAskedQuestions />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await axios
    .get(`https://capi.vopp.top/main`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return { props: { data } };
};

export default Home;

const Wrapper = styled.div``;

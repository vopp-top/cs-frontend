import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../components/Heading";
import TopEmotesLeaderboard from "../components/Home/TopEmotesLeaderboard";
import TopStreamersLeaderboard from "../components/Home/TopStreamersLeaderboard";
import TopUsersLeaderboard from "../components/Home/TopUsersLeaderboard";
import Loader from "../components/Loader";
import Text from "../components/Text";
import { IGlobal } from "../types/types";
import { Leaderboards } from "./streamer/[username]";
// import Head from "next/head";

const Home: NextPage = () => {
  const [data, setData] = useState<IGlobal>({} as IGlobal);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get(`/__global__/index.json`)
        .catch((err) => console.log(err));

      if (res) setData(res.data);
    };
    fetchData();
  }, []);

  if (Object.keys(data).length === 0) return <Loader />;
  return (
    <Wrapper>
      <Heading mb={50}>
        Top 10{" "}
        <Text as={"span"} fontWeight={500} fontSize={"lg"} textColor={"main"}>
          /Nov
        </Text>
      </Heading>
      <Leaderboards>
        <TopUsersLeaderboard users={data.users} />
        <TopEmotesLeaderboard emotes={data.emotes} />
      </Leaderboards>
      <Heading my={50} mb={50}>
        Top Streamers{" "}
        <Text as={"span"} fontWeight={500} fontSize={"lg"} textColor={"main"}>
          /Nov
        </Text>
      </Heading>
      <TopStreamersLeaderboard streamers={data.streamers} />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div``;

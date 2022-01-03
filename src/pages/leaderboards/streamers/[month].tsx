import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { server } from "../..";
import Heading from "../../../components/Heading";
import TopStreamersLeaderboard from "../../../components/Home/TopStreamersLeaderboard";
import Loader from "../../../components/Loader";
import { Streamer } from "../../../types/types";
// Types -------------------------------------------------------------------------

interface Props {
  streamers: Streamer[];
}

// Component ---------------------------------------------------------------------
const TopStreamersLB: React.FC<Props> = ({ streamers }) => {
  const { month } = useRouter().query;
  const [data, setData] = useState(streamers);

  const fetchStreamers = async () => {
    const data = await axios
      .get(`https://capi.vopp.top/main`, { params: { month } })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    if (data) setData(data.streamers);
  };

  useEffect(() => {
    fetchStreamers();
  }, [month]);

  if (!data) return <Loader />;

  return (
    <>
      <Head>
        <title>chat.vopp.top | Top Streamers</title>
        <meta name="description" content="Streamers Leaderboard" />
      </Head>
      <Heading mb={0}>Top Streamers</Heading>
      <TopStreamersLeaderboard controlls={true} streamers={data} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { month }: any = ctx.params;

  const data = await axios
    .get(`https://capi.vopp.top/main`, { params: { month } })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return { props: { streamers: data.streamers } };
};

export default TopStreamersLB;

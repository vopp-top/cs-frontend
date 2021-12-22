import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
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
  if (!streamers) return <Loader />;

  return (
    <>
      <Head>
        <title>chat.vopp.top | Top Streamers</title>
        <meta name="description" content="Streamers Leaderboard" />
      </Head>
      <Heading mb={0}>Top Streamers</Heading>
      <TopStreamersLeaderboard controlls={true} streamers={streamers} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { month }: any = ctx.params;

  const data = await fetch(`${server}/static/${month}/global/index.json`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return { props: { streamers: data?.streamers } };
};

export default TopStreamersLB;

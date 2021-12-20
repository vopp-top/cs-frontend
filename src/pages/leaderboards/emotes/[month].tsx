import { GetServerSideProps } from "next";
import React, { useMemo } from "react";
import styled from "styled-components";
import { server } from "../..";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";
import TableText from "../../../components/Leaderboard/TableText";
import { month } from "../../../constants/currentMonth";
import { Emote } from "../../../types/types";
// Types -------------------------------------------------------------------------

interface Props {
  emotes: Emote[];
}

// Component ---------------------------------------------------------------------
const TopEmotesPage: React.FC<Props> = ({ emotes }) => {
  const data = useMemo(() => emotes, [emotes]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "position",
        collapse: true,
        className: "place",
        width: 60,
      },
      {
        Header: "Nick",
        accessor: "name",
        className: "name",
        width: "100%",
        // @ts-ignore
        Cell: ({ value }) => {
          return <TableText text={value} />;
        },
      },
      {
        Header: "Messages\nCount",
        accessor: "count",
        className: "count",
        collapse: true,
        // width: ,
        minWidth: 100,
        maxWidth: 150,
        // @ts-ignore
        Cell: ({ value }) => {
          return value.toLocaleString("en-US");
        },
      },
    ],
    []
  );

  return <Leaderboard data={data} columns={columns} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const emotes = await fetch(`${server}/static/${month()}/global/emotes.json`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return { props: { emotes } };
};

export default TopEmotesPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

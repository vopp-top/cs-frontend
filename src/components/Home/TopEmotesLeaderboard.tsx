import Link from "next/link";
import React, { useMemo } from "react";
import styled from "styled-components";
import { month } from "../../constants/currentMonth";
import { Emote } from "../../types/types";
import Button from "../Button";
import Leaderboard from "../Leaderboard/Leaderboard";
import TableText from "../Leaderboard/TableText";
// Types -------------------------------------------------------------------------

interface Props {
  emotes: Emote[];
}

// Component ---------------------------------------------------------------------
const TopEmotesLeaderboard: React.FC<Props> = ({ emotes }) => {
  const data = useMemo(() => emotes, [emotes]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "position",
        className: "place",
        collapse: true,
        width: 60,
      },
      {
        Header: "Emote",
        accessor: "name",
        className: "name",
        width: "100%",
        collapse: false,
        // @ts-ignore

        Cell: ({ value, row: { original } }) => {
          return <TableText text={value} emote={original.url} />;
        },
      },
      {
        Header: "Messages\nCount",
        accessor: "count",
        className: "count",
        collapse: true,
        // width: 60,
        // @ts-ignore
        Cell: ({ value }) => {
          return value.toLocaleString("en-US");
        },
      },
    ],
    []
  );

  return (
    <Wrapper>
      <Leaderboard title="Top Emotes" columns={columns} data={data} />
      <Link href={`/leaderboards/emotes/${month()}`}>
        <Button height={50} fontSize={"md"}>
          Full Leaderboard
        </Button>
      </Link>
    </Wrapper>
  );
};

export default TopEmotesLeaderboard;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

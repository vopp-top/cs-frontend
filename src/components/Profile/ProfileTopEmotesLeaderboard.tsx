import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { Emote } from "../../types/types";
import Leaderboard from "../Leaderboard/Leaderboard";
import TableText from "../Leaderboard/TableText";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {
  emotes: Emote[];
}

// Component ---------------------------------------------------------------------
const ProfileTopEmotesLeaderboard: React.FC<Props> = ({ emotes }) => {
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

  return <Leaderboard title="Top Emotes" columns={columns} data={data} />;
};

export default ProfileTopEmotesLeaderboard;

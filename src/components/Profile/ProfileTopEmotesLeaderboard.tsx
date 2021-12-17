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
        Header: "-",
        accessor: "position",
        collapse: true,
      },
      {
        Header: "Emote",
        accessor: "name",
        collapse: false,
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          return (
            <TableText text={original.name}>
              <img src={original.url} alt={original.name} />
            </TableText>
          );
        },
      },
      {
        Header: "Count",
        accessor: "count",
        collapse: true,
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          return original.count.toLocaleString("en-US");
        },
      },
    ],
    []
  );

  return <Leaderboard title="Top Emotes" columns={columns} data={data} />;
};

export default ProfileTopEmotesLeaderboard;

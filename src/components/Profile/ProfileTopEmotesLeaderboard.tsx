import React, { useMemo } from "react";
import styled from "styled-components";
import { Emote } from "../../types/types";
import Leaderboard from "../Leaderboard/Leaderboard";
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
            <Emot>
              <img src={original.url} />
              <Text as={"span"}>{original.name}</Text>
            </Emot>
          );
        },
      },
      {
        Header: "Count",
        accessor: "count",
        collapse: true,
      },
    ],
    []
  );

  return <Leaderboard title="Top Emotes" columns={columns} data={data} />;
};

export default ProfileTopEmotesLeaderboard;

// Styled ------------------------------------------------------------------------

const Emot = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 1ch;
  }
`;

import React, { useMemo } from "react";
import styled from "styled-components";
import { Streamer } from "../../types/types";
import Avatar from "../Avatar";
import Leaderboard from "../Leaderboard/Leaderboard";
import TableText from "../Leaderboard/TableText";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {
  streamers: Streamer[];
}

// Component ---------------------------------------------------------------------
const TopStreamersLeaderboard: React.FC<Props> = ({ streamers }) => {
  const data = useMemo(() => streamers, [streamers]);

  const columns = useMemo(
    () => [
      {
        Header: "-",
        accessor: "position",
        collapse: true,
      },
      {
        Header: "Nick",
        accessor: "name",
        collapse: false,
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          return (
            <Wrapper>
              <Avatar mr={3} url={original.avatar} />
              <Text as={"span"}>{original.name}</Text>
            </Wrapper>
          );
        },
      },
      {
        Header: "Messages Count",
        accessor: "messages_count",
        collapse: true,
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          return original.messages_count.toLocaleString("en-US");
        },
      },
      {
        Header: "Emotes Count",
        accessor: "emotes_count",
        collapse: true,
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          return original.emotes_count.toLocaleString("en-US");
        },
      },
      {
        Header: "Time Watched",
        accessor: "time_count",
        collapse: true,
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          return original.time_count.toLocaleString("en-US");
        },
      },
    ],
    []
  );

  return <Leaderboard columns={columns} data={data} />;
};

export default TopStreamersLeaderboard;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

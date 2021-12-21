import React, { useMemo } from "react";
import styled from "styled-components";
import { User } from "../../types/types";
import Leaderboard from "../Leaderboard/Leaderboard";
import TableText from "../Leaderboard/TableText";
// Types -------------------------------------------------------------------------

interface Props {
  users: User[];
}

// Component ---------------------------------------------------------------------
const ProfileTopUsersLeaderboard: React.FC<Props> = ({ users }) => {
  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "position",
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

  return <Leaderboard title="Top Users" columns={columns} data={data} />;
};

export default ProfileTopUsersLeaderboard;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

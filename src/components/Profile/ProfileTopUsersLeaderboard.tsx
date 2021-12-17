import React, { useMemo } from "react";
import styled from "styled-components";
import { User } from "../../types/types";
import Leaderboard from "../Leaderboard/Leaderboard";
// Types -------------------------------------------------------------------------

interface Props {
  users: User[];
}

// Component ---------------------------------------------------------------------
const TopUsersLeaderboard: React.FC<Props> = ({ users }) => {
  const data = useMemo(() => users, [users]);

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
      },
      {
        Header: "Count",
        accessor: "count",
        collapse: true,
      },
    ],
    []
  );

  return <Leaderboard title="Top Users" columns={columns} data={data} />;
};

export default TopUsersLeaderboard;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

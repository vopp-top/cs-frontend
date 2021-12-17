import React, { useMemo } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import { User } from "../../types/types";
import Leaderboard, {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "../Leaderboard/Leaderboard";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {
  users: User[];
}

// Component ---------------------------------------------------------------------
const TopUsersLeaderboard: React.FC<Props> = ({ users }) => {
  const data = useMemo(() => users, []);

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

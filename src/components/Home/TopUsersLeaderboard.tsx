import Link from "next/link";
import React, { useMemo } from "react";
import styled from "styled-components";
import { MONTH_TLC } from "../../constants/currentMonth";
import { User } from "../../types/types";
import Button from "../Button";
import Leaderboard from "../Leaderboard/Leaderboard";
import TableText from "../Leaderboard/TableText";
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

  return (
    <Wrapper>
      <Leaderboard columns={columns} data={data} title="Top Users" />
      <Link href={`/leaderboards/users/${MONTH_TLC}`}>
        <Button height={50} fontSize={"md"}>
          Full Leaderboard
        </Button>
      </Link>
    </Wrapper>
  );
};

export default TopUsersLeaderboard;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

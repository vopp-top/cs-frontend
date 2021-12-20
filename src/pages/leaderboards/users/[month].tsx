import { GetServerSideProps } from "next";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { server } from "../..";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";
import TableText from "../../../components/Leaderboard/TableText";
import { month } from "../../../constants/currentMonth";
import { User } from "../../../types/types";
// Types -------------------------------------------------------------------------

interface Props {
  users: User[];
}

// Component ---------------------------------------------------------------------
const TopUsersPage: React.FC<Props> = ({ users }) => {
  const [data, setData] = React.useState(users);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  // const data = useMemo(() => users, [users]);

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

  const fetchData = useCallback(async ({ pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);

    if (fetchId === fetchIdRef.current) {
      const res = await fetch(`https://capi.vopp.top/users/page/${pageIndex}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));

      setData(res.users);
      setPageCount(res.maxIndex);

      setLoading(false);
      console.log(res);
    }
  }, []);

  return (
    <Leaderboard
      data={data}
      columns={columns}
      fetchData={fetchData}
      pageCount={pageCount}
      loading={loading}
      pagination={true}
    />
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { users } = await fetch(`https://capi.vopp.top/users/page/0`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return { props: { users } };
};

export default TopUsersPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

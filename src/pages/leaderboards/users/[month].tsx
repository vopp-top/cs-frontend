import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Heading from "../../../components/Heading";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";
import TableText from "../../../components/Leaderboard/TableText";
import { User } from "../../../types/types";
// Types -------------------------------------------------------------------------

interface Props {
  users: User[];
  count: number;
}

// Component ---------------------------------------------------------------------
const TopUsersPage: React.FC<Props> = ({ users, count }) => {
  const { month } = useRouter().query;
  const [data, setData] = React.useState(users);
  const [loading, setLoading] = React.useState(true);
  const [pageCount, setPageCount] = React.useState(count);
  const fetchIdRef = React.useRef(0);

  const fetchUsers = async () => {
    const res = await axios
      .get(`https://capi.vopp.top/users/page/0`, { params: { month } })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    console.log(res);
    if (res) setData(res.users);
  };

  useEffect(() => {
    if (!month) return;
    fetchUsers();
  }, [month]);

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

  const fetchData = useCallback(
    async ({ pageIndex, query, setErr, pageSize }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);

      if (fetchId === fetchIdRef.current) {
        try {
          const res = await axios
            .get(`https://capi.vopp.top/users/page/${pageIndex}`, {
              params: {
                name: query,
                offset: pageSize,
                month,
              },
            })
            .then((res) => {
              if (res.status === 404) throw new Error();
              return res.data;
            });

          if (res) {
            setData(res.users);
            setPageCount(res.maxIndex + 1);
          }
        } catch {
          setErr(true);
        }
      }

      setLoading(false);
    },
    []
  );

  if (!data) return null;

  return (
    <>
      <Head>
        <title>chat.vopp.top | Top Users</title>
        <meta name="description" content="Users Leaderboard" />
      </Head>
      <Heading mb={0}>Top Users</Heading>
      <Leaderboard
        searchType="users"
        data={data}
        columns={columns}
        fetchData={fetchData}
        pageCount={pageCount}
        pagination={true}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { month }: any = ctx.params as { month: string };

  const res = await axios
    .get(`https://capi.vopp.top/users/page/0`, { params: { month } })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: { users: res?.users || null, count: res?.maxIndex + 1 || null },
  };
};

export default TopUsersPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

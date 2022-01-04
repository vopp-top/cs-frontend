import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import Heading from "../../../components/Heading";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";
import TableText from "../../../components/Leaderboard/TableText";
import { Emote } from "../../../types/types";
// Types -------------------------------------------------------------------------

interface Props {
  emotes: Emote[];
  count: number;
}

// Component ---------------------------------------------------------------------
const TopEmotesPage: React.FC<Props> = ({ emotes, count }) => {
  const { month } = useRouter().query;
  const [data, setData] = React.useState(emotes);
  const [pageCount, setPageCount] = React.useState(count);
  const fetchIdRef = React.useRef(0);

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
        Cell: ({ value, row: { original } }) => {
          return <TableText text={value} emote={original.url} />;
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

  const fetchEmotes = async () => {
    const res = await axios
      .get(`https://capi.vopp.top/emotes/page/0`, { params: { month } })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    if (res) setData(res.emotes);
  };

  useEffect(() => {
    fetchEmotes();
  }, [month]);

  const fetchData = useCallback(
    async ({ pageIndex, query, setErr, pageSize }) => {
      const fetchId = ++fetchIdRef.current;

      if (fetchId === fetchIdRef.current) {
        try {
          const res = await axios
            .get(`https://capi.vopp.top/emotes/page/${pageIndex}`, {
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
            setData(res.emotes);
            setPageCount(res.maxIndex + 1);
          }
        } catch {
          setErr(true);
        }
      }
    },
    [month]
  );

  return (
    <>
      <Head>
        <title>chat.vopp.top | Top Emotes</title>
        <meta name="description" content="Emotes Leaderboard" />
      </Head>
      <Heading mb={0}>Top Emotes</Heading>
      <Leaderboard
        searchType="emotes"
        data={data}
        columns={columns}
        fetchData={fetchData}
        pageCount={pageCount}
        pagination={true}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await axios
    .get(`https://capi.vopp.top/emotes/page/0`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return { props: { emotes: res.emotes, count: res.maxIndex + 1 } };
};

export default TopEmotesPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

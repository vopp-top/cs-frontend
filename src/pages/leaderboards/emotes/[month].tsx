import { GetServerSideProps } from "next";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { server } from "../..";
import Heading from "../../../components/Heading";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";
import TableText from "../../../components/Leaderboard/TableText";
import { month } from "../../../constants/currentMonth";
import { Emote } from "../../../types/types";
// Types -------------------------------------------------------------------------

interface Props {
  emotes: Emote[];
}

// Component ---------------------------------------------------------------------
const TopEmotesPage: React.FC<Props> = ({ emotes }) => {
  const [data, setData] = React.useState(emotes);
  const [loading, setLoading] = React.useState(true);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);
  // const data = useMemo(() => emotes, [emotes]);

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

  const fetchData = useCallback(async ({ pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);

    if (fetchId === fetchIdRef.current) {
      const res = await fetch(`https://capi.vopp.top/emotes/page/${pageIndex}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));

      if (res) {
        setData(res.emotes);
        setPageCount(res.maxIndex);
      }

      setLoading(false);
    }
  }, []);

  return (
    <>
      <Heading mb={0}>Top Emotes</Heading>
      <Leaderboard
        searchType="emotes"
        data={data}
        columns={columns}
        fetchData={fetchData}
        pageCount={pageCount}
        loading={loading}
        pagination={true}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { emotes } = await fetch(`https://capi.vopp.top/emotes/page/0`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return { props: { emotes } };
};

export default TopEmotesPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

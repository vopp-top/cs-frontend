import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import styled from "styled-components";
import { server } from "../..";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import Icon from "../../../components/Icon";
import { GlobalFilter } from "../../../components/Leaderboard/Streamers/GlobalFilter";
import MonthSelection from "../../../components/Leaderboard/Streamers/MonthSelection";
import PaginationSelection from "../../../components/Leaderboard/Streamers/PaginationSelection";
import Loader from "../../../components/Loader";
import Text from "../../../components/Text";
import {
  PagBtn,
  PagBtns,
  PagControlls,
  PageInput,
  Pagination,
} from "../../../styles/PaginationStyles";
import { Streamer } from "../../../types/types";
// Types -------------------------------------------------------------------------

interface Props {
  streamers: Streamer[];
}

// Component ---------------------------------------------------------------------
const TopStreamersLB: React.FC<Props> = ({ streamers }) => {
  if (!streamers) return <Loader />;
  const data = useMemo(() => streamers, [streamers]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "position",
        className: "place",
        disableSortBy: true,
      },
      {
        Header: "Nick",
        accessor: "name",
        className: "streamer",
        disableSortBy: true,
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          return (
            <>
              <Link href={`/streamer/${original.name.toLowerCase()}`}>
                <Avatar mr={3} url={original.avatar} />
              </Link>
              <Text as={"span"} fontWeight={500}>
                {original.name}
              </Text>
            </>
          );
        },
      },
      {
        Header: "Emotes\nPer Message",
        accessor: "emotes_per_message",
        // @ts-ignore
        Cell: ({ value }) => {
          if (!value) return 0;
          return value.toFixed(1);
        },
      },
      {
        Header: "Messages\nPer Second",
        accessor: "messages_per_second",
        // @ts-ignore
        Cell: ({ value }) => {
          if (!value) return 0;
          return value.toFixed(1);
        },
      },
      {
        Header: "Messages\nCount",
        accessor: "messages_count",
        id: "count",
        // @ts-ignore
        Cell: ({ value }) => {
          return value.toLocaleString("en-US");
        },
      },
      {
        Header: "Emotes\nCount",
        accessor: "emotes_count",
        // @ts-ignore
        Cell: ({ value }) => {
          return value.toLocaleString("en-US");
        },
      },
      {
        Header: "Stream Time\nin Seconds",
        accessor: "time_count",
        // @ts-ignore
        Cell: ({ value }) => {
          return value.toLocaleString("en-US");
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    // @ts-ignore
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    // @ts-ignore
    pageCount,
    // pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      disableSortRemove: true,
      // @ts-ignore
      initialState: { sortBy: [{ id: "count", desc: true }] },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  console.log(pageSize);

  return (
    <>
      <Heading mb={0}>Top Streamers</Heading>
      <Controllers>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          // @ts-ignore
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <MonthSelection />
      </Controllers>
      <Wrapper pageSize={pageSize}>
        <Table {...getTableProps()}>
          <col span={1} className="wide" />
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <TableHeader
                    colSpan={visibleColumns.length}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    {...column.getHeaderProps({ className: column.className })}
                    {...column.getHeaderProps({
                      className: column.isSorted ? "active" : "",
                    })}
                  >
                    {column.render("Header")}
                    <Caret>
                      {column.isSorted ? (
                        <Icon
                          as={column.isSortedDesc ? FaCaretDown : FaCaretUp}
                        />
                      ) : null}
                    </Caret>
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <TableData
                        {...cell.getCellProps({
                          className: cell.column.className,
                        })}
                        {...cell.getCellProps({
                          className: cell.column.isSorted ? "active" : "",
                        })}
                      >
                        {cell.render("Cell")}
                      </TableData>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Wrapper>
      <Pagination>
        <Text as={"span"} fontSize={"sm"} textColor={"#d9d9d9"}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </Text>
        <PagBtns>
          <PagBtn onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <Icon as={FaAngleDoubleLeft} />
          </PagBtn>
          <PagBtn onClick={() => previousPage()} disabled={!canPreviousPage}>
            <Icon as={FaAngleLeft} />
          </PagBtn>
          <PageInput
            placeholder="..."
            type="number"
            min={1}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
          <PagBtn onClick={() => nextPage()} disabled={!canNextPage}>
            <Icon as={FaAngleRight} />
          </PagBtn>
          <PagBtn
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <Icon as={FaAngleDoubleRight} />
          </PagBtn>
        </PagBtns>
        <PaginationSelection pageSize={pageSize} setPageSize={setPageSize} />
      </Pagination>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { month }: any = ctx.params;

  const data = await fetch(`${server}/static/${month}/global/index.json`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return { props: { streamers: data?.streamers } };
};
export default TopStreamersLB;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div<{ pageSize: number }>`
  min-height: calc(66px + 74px * ${({ pageSize }) => pageSize});
  width: 100%;
`;

const Controllers = styled.div`
  margin: 25px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const Caret = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

const Table = styled.table`
  color: ${({ theme }) => theme.colors.textSub};
  border-spacing: 0;
  table-layout: fixed;
  border-collapse: collapse;

  .wide {
    width: 5%;
  }

  .active {
    background-color: ${({ theme }) => theme.colors.subHover};
  }

  td,
  th {
    padding: 15px 10px;
  }

  width: 100%;
`;

// head
const TableHead = styled.thead`
  word-wrap: none;
  white-space: pre;
  user-select: none;
`;

const TableHeader = styled.th`
  color: ${({ theme }) => theme.colors.main};
  position: relative;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &.streamer {
    text-align: left;
    padding-left: 0;
  }
`;

// body
const TableBody = styled.tbody`
  & tr {
    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.sub};
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.subHover};
    }
  }
`;

const TableRow = styled.tr``;

const TableData = styled.td`
  text-align: center;

  &.active {
    color: white;
  }

  &.streamer {
    color: white;
    font-family: Helvetica, sans-serif;
    min-width: 225px;
    display: flex;
    align-items: center;
    padding: 15px 10px;
    padding-left: 0;

    span {
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &.place {
    padding: 20px 0;
    font-weight: 300;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

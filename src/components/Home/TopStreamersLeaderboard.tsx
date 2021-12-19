import Link from "next/link";
import React, { useMemo } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useSortBy, useTable } from "react-table";
import styled from "styled-components";
import { Streamer } from "../../types/types";
import Avatar from "../Avatar";
import Button from "../Button";
import Icon from "../Icon";
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
        Cell: ({ row: { original } }) => {
          if (!original.emotes_per_message) return 0;
          return original.emotes_per_message.toFixed(1);
        },
      },
      {
        Header: "Messages\nPer Second",
        accessor: "messages_per_second",
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          if (!original.messages_per_second) return 0;
          return original.messages_per_second.toFixed(1);
        },
      },
      {
        Header: "Messages\nCount",
        accessor: "messages_count",
        id: "count",
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          return original.messages_count.toLocaleString("en-US");
        },
      },
      {
        Header: "Emotes\nCount",
        accessor: "emotes_count",
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          return original.emotes_count.toLocaleString("en-US");
        },
      },
      {
        Header: "Stream time\nin seconds",
        accessor: "time_count",
        // @ts-ignore
        Cell: ({ row: { original } }) => {
          return original.time_count.toLocaleString("en-US");
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        // @ts-ignore
        columns,
        data,
        // @ts-ignore
        disableSortRemove: true,
        // @ts-ignore
        initialState: { sortBy: [{ id: "count", desc: true }] },
      },
      useSortBy
    );

  const firstPageRows = rows.slice(0, 25);

  return (
    <Wrapper>
      <Table {...getTableProps()}>
        <col span={1} className="wide" />
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <TableHeader
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
          {firstPageRows.map((row) => {
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
      {/* <Button mt={3}>See more</Button> */}
    </Wrapper>
  );
};

export default TopStreamersLeaderboard;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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

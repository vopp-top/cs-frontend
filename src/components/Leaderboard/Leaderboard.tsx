import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import Text from "../Text";
// Types -------------------------------------------------------------------------

export interface ILeaderboard {
  title: string;
  data: {}[];
  columns: {
    Header: string;
    accessor: string;
    collapse: boolean;
  }[];
}

// Component ---------------------------------------------------------------------
const Leaderboard: React.FC<ILeaderboard> = ({ title, data, columns }) => {
  if (data.length === 0) return <p>1</p>;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Wrapper>
      <Text mb={3} fontWeight={400} fontSize={"xxl"}>
        {title}
      </Text>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <TableHeader
                  {...column.getHeaderProps({
                    className: column.collapse ? "collapse" : "",
                  })}
                >
                  {column.render("Header")}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <TableData
                      {...cell.getCellProps({
                        className: cell.column.collapse ? "collapse" : "",
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
  );
};

export default Leaderboard;

// Styled ------------------------------------------------------------------------

export const Wrapper = styled.div`
  display: block;
  max-width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  &.tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  th,
  td {
    margin: 0;
    padding: 0 2rem;

    width: 1%;
    &.collapse {
      width: 0.0000000001%;
    }
  }
`;

export const TableHead = styled.thead``;

export const TableRow = styled.tr`
  max-height: 65px;
  height: 65px;
  color: white;
`;

export const TableBody = styled.tbody`
  max-width: fit-content;
  tr {
    &:nth-child(odd):not(thead) {
      background-color: ${({ theme }) => theme.colors.sub};
    }
  }
`;

export const TableData = styled.td`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  vertical-align: middle;

  &.collapse {
    color: #ffffff80;
    font-weight: 400;
  }
`;

export const TableHeader = styled.th`
  color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
`;

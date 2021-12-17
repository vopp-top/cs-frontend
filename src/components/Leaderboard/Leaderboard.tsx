import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import Text from "../Text";
// Types -------------------------------------------------------------------------

export interface ILeaderboard {
  title?: string;
  data: {}[];
  columns: {
    Header: string;
    accessor: string;
    collapse: boolean;
  }[];
}

// Component ---------------------------------------------------------------------
const Leaderboard: React.FC<ILeaderboard> = ({ title, data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Wrapper>
      {title && (
        <Text mb={3} fontWeight={400} fontSize={"xxl"}>
          {title}
        </Text>
      )}
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

const Wrapper = styled.div`
  display: block;
  max-width: 100%;
`;

const Table = styled.table`
  max-width: 100%;
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

const TableHead = styled.thead`
  text-align: left;
  white-space: nowrap;
`;

const TableRow = styled.tr`
  max-height: 65px;
  height: 65px;
  color: white;
`;

const TableBody = styled.tbody`
  tr {
    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.sub};
    }
  }
`;

const TableData = styled.td`
  &.collapse {
    color: #ffffff80;
    font-weight: 400;
  }
`;

const TableHeader = styled.th`
  color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
`;

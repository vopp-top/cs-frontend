import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
} from "../../styles/LeaderboardStyles";
import Text from "../Text";
// Types -------------------------------------------------------------------------

export interface ILeaderboard {
  title?: string;
  data: {}[];
  columns: {
    Header: string;
    accessor: string;
    collapse?: boolean;
  }[];
}

// Component ---------------------------------------------------------------------
const Leaderboard: React.FC<ILeaderboard> = ({ title, data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    // @ts-ignore
    useTable({ columns, data });

  return (
    <Wrapper>
      {title && (
        <Text mb={3} fontWeight={400} fontSize={"xxl"}>
          {title}
        </Text>
      )}
      <Wrap>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <TableHeader
                    {...column.getHeaderProps({
                      className: column.collapse ? "collapse" : "",
                    })}
                    {...column.getHeaderProps({
                      className: column.className,
                      style: {
                        // minWidth: column.minWidth,
                        // maxWidth: column.maxWidth,
                        width: column.width,
                      },
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
                        {...cell.getCellProps({
                          className: cell.column.className,
                          style: {
                            // minWidth: cell.column.minWidth,
                            // maxWidth: cell.column.maxWidth,
                            width: cell.column.width,
                          },
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
      </Wrap>
    </Wrapper>
  );
};

export default Leaderboard;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  display: block;
  max-width: 100%;
`;

const Wrap = styled.div`
  display: block;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`;

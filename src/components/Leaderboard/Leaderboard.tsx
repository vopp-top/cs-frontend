import React, { useEffect } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { usePagination, useTable } from "react-table";
import styled from "styled-components";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
} from "../../styles/LeaderboardStyles";
import {
  Pagination,
  PagBtns,
  PagBtn,
  PageInput,
} from "../../styles/PaginationStyles";
import { User } from "../../types/types";
import Icon from "../Icon";
import Text from "../Text";
import PaginationSelection from "./Streamers/PaginationSelection";
import SearchUser, { SearchTypes } from "./Users/SearchLeaderboard";
// Types -------------------------------------------------------------------------

export interface ILeaderboard {
  title?: string;
  data: {}[];
  columns: {
    Header: string;
    accessor: string;
    collapse?: boolean;
  }[];
  fetchData?: ({}: any) => any;
  loading?: boolean;
  pageCount?: number;
  pagination?: boolean;
  searchType?: SearchTypes;
}

// Component ---------------------------------------------------------------------
const Leaderboard: React.FC<ILeaderboard> = ({
  title,
  data,
  pagination,
  columns,
  fetchData,
  pageCount: controlledPageCount,
  searchType,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    // @ts-ignore
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize },
  } =
    // @ts-ignore
    useTable(
      {
        columns,
        data,
        // @ts-ignore
        initialState: { pageIndex: 0 },
        manualPagination: true,
        pageCount: controlledPageCount,
      },
      usePagination
    );

  useEffect(() => {
    if (!fetchData) return;
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <Wrapper>
      {title && (
        <Text mb={3} fontWeight={400} fontSize={"xxl"}>
          {title}
        </Text>
      )}
      {pagination && searchType && (
        <>
          <SearchUser gotoPage={gotoPage} type={searchType!} />
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
              <PagBtn
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
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
            {/* <PaginationSelection pageSize={pageSize} setPageSize={setPageSize} /> */}
          </Pagination>
        </>
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
            {page.map((row) => {
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
      {pagination && (
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
          {/* <PaginationSelection pageSize={pageSize} setPageSize={setPageSize} /> */}
        </Pagination>
      )}
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

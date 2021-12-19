import styled from "styled-components";

export const Table = styled.table`
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

export const TableHead = styled.thead`
  word-wrap: none;
  white-space: pre;
`;

export const TableRow = styled.tr`
  max-height: 65px;
  height: 65px;
  color: white;
  /* text-align: center; */
`;

export const TableBody = styled.tbody`
  tr {
    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.sub};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.subHover} !important;
    }
  }
`;

export const TableData = styled.td`
  &.collapse {
    color: #ffffff80;
    font-weight: 400;
  }
`;

export const TableHeader = styled.th`
  position: relative;
  text-align: left;
  user-select: none;
  color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
`;

import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.textSub};

  .wide {
    width: 60px;
    max-width: 60px;
  }

  tr,
  td {
    &.name {
      color: white;
    }
  }
`;

export const TableHead = styled.thead`
  word-wrap: none;
  white-space: pre;
`;

export const TableRow = styled.tr`
  height: 65px;
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
  text-align: center;

  &.place {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: 0;
    color: ${({ theme }) => theme.colors.textSub};
  }

  &.name {
    padding: 0;
    text-align: left;
  }

  /* &.count {
    padding: 0 1rem;
  } */

  &.collapse {
    color: #ffffff80;
    font-weight: 400;
  }
`;

export const TableHeader = styled.th`
  position: relative;
  user-select: none;
  color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  text-align: center;

  &.name {
    text-align: left;
    padding: 0;
  }

  /* &.count {
    padding: 0 1rem;
  } */
`;

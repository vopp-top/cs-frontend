import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Row, useAsyncDebounce } from "react-table";
import styled from "styled-components";
import { Streamer } from "../../../types/types";
import Icon from "../../Icon";

interface Props {
  preGlobalFilteredRows: Row<Streamer>[];
  globalFilter: any;
  setGlobalFilter: (filterValue: any) => void;
}

// Define a default UI for filtering
export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: Props) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  // @ts-ignore
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Wrapper>
      <SearchBox
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} streamers...`}
      />
      <Box>
        <Icon as={FaSearch} />
      </Box>
    </Wrapper>
  );
};

const Box = styled.div`
  position: absolute;
  right: 1.2rem;
  z-index: 99;
  background: #121212;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

const SearchBox = styled.input`
  padding: 0 1.2rem;
  height: 100%;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.subHover};
  border-radius: ${({ theme }) => theme.rounded.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

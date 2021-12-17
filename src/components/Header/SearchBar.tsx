import { useRouter } from "next/router";
import React, { KeyboardEvent } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import Icon from "../Icon";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const SearchBar: React.FC<Props> = () => {
  const router = useRouter();
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/user/${e.currentTarget.value}`);
      e.currentTarget.value = "";
    }
  };

  return (
    <Wrapper>
      <Input
        type={"search"}
        placeholder="Search for streamer"
        onKeyDown={handleKeyDown}
      />
      <Icon ml={2} as={FaSearch} />
    </Wrapper>
  );
};

export default SearchBar;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.sub};
  border-radius: ${({ theme }) => theme.rounded.sm};
  overflow: hidden;
  display: flex;
  padding: 0 16px;
  align-items: center;
  min-width: 300px;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;
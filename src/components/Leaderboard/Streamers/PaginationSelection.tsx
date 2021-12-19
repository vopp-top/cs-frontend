import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import Icon from "../../Icon";
import Text from "../../Text";
// Types -------------------------------------------------------------------------

interface Props {
  setPageSize: (pageSize: number) => void;
  pageSize: any;
}

// Component ---------------------------------------------------------------------
const PaginationSelection: React.FC<Props> = ({ pageSize, setPageSize }) => {
  const [active, setActive] = useState(false);

  const pags = [10, 20, 30, 40, 50];

  return (
    <Dropdown>
      <Button onClick={() => setActive(!active)}>
        <Text as={"span"} ml={3}>
          {pageSize}
        </Text>
        <Icon as={FaCaretDown} mx={2} />
      </Button>
      {active && (
        <Content>
          {pags.map((val) => (
            <Item
              onClick={() => {
                setPageSize(Number(val));
                setActive(false);
              }}
            >
              {val}
            </Item>
          ))}
        </Content>
      )}
    </Dropdown>
  );
};

export default PaginationSelection;

// Styled ------------------------------------------------------------------------

const Dropdown = styled.div`
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.sub};
  border-radius: ${({ theme }) => theme.rounded.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  height: 100%;
  cursor: pointer;
  user-select: none;

  &.div {
    height: 100%;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;

const Content = styled.div`
  padding: 0 1.2rem;
  border-radius: ${({ theme }) => theme.rounded.md};
  background-color: ${({ theme }) => theme.colors.sub};
  margin-top: 6px;
`;

const Item = styled.div`
  padding: 0.5rem 0;
  text-align: center;
`;

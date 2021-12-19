import styled, { css } from "styled-components";

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  position: relative;
  height: 40px;
`;

export const PagBtns = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.8rem;
  position: absolute;
  height: 100%;
  right: 50%;
  transform: translateX(50%);
`;

export const PagBtn = styled.button`
  border-radius: ${({ theme }) => theme.rounded.md};
  background-color: ${({ theme }) => theme.colors.sub};
  padding: 0.6rem 0.8rem;
  cursor: pointer;

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0;
          position: none;
          visibility: hidden;
        `
      : null}
`;

export const PagControlls = styled.div`
  /* color: ${({ theme }) => theme.colors.textSub}; */
`;

export const PageInput = styled.input`
  padding: 0.6rem 0.8rem;
  background-color: ${({ theme }) => theme.colors.sub};
  height: 100%;
  border-radius: ${({ theme }) => theme.rounded.md};
  text-align: center;
`;

export const PageIndex = styled.div``;

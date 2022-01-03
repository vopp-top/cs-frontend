import React from "react";
import styled, { ThemeProvider } from "styled-components";
import MonthProvider from "../contexts/global.context";
import Layout from "../layout/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import { theme } from "../themes/theme";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: React.FC<Props> = ({ children }) => {
  return (
    <MonthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>{children}</Layout>
      </ThemeProvider>
    </MonthProvider>
  );
};

export default AppWrapper;

// Styled ------------------------------------------------------------------------

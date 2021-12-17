import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Layout from "../layout/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import { theme } from "../themes/theme";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
};

export default AppWrapper;

// Styled ------------------------------------------------------------------------

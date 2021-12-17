import React from "react";
import styled from "styled-components";
import Layout from "../layout/Layout";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
};

export default AppWrapper;

// Styled ------------------------------------------------------------------------

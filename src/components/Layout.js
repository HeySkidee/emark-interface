import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import IndexerStats from "./IndexerStats";

function Layout({children}) {
  return (
    <>
      <IndexerStats/>
      <Header/>
      <Wrapper>
        {children}
      </Wrapper>
      <Footer/>
    </>
  );
}

export default Layout;

const Wrapper = styled.div`
  padding: 100px 0 50px 0;

  @media (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`
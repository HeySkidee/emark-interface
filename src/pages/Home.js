import React from "react";
import styled from "styled-components"
import Header from "../views/home/Header";
import HowDoWork from "../views/home/HowDoWork";
import TheProcess from "../views/home/TheProcess";
import GetStart from "../views/home/GetStart";

function Home() {
  return (
    <Content>
      <Header/>
      <HowDoWork/>
      <TheProcess/>
      <GetStart/>
    </Content>
  )
}

export default Home

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: calc(100% - 100px);

  @media (max-width: 800px) {
    padding: 0 15px;
  }
`

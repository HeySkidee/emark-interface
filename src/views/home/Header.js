import React from "react";
import styled from "styled-components"
import { useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate()

  const handleLearn = () => {
    document.getElementById('learn').scrollIntoView({behavior: 'smooth'});
  }

  return (
    <Wrapper>
      <Title>
        The <span style={{fontStyle: "italic", fontWeight: "bold"}}>E-MARK</span>
      </Title>

      <RowWrapper style={{marginTop: '30px', marginBottom: '60px'}}>
        <Button onClick={() => nav('/inscribe')}>MINT NOW</Button>
        <ButtonGust onClick={handleLearn}>LEARN MORE</ButtonGust>
      </RowWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Title = styled.div`
  font-size: 60px;
  color: #FFFFFF;
  text-align: center;

  margin-top: 75px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 800px) {
    font-size: 48px;
  }
`

const Button = styled.div`
  margin-right: 20px;
  font-size: 14px;
  color: #202021;
  line-height: 40px;
  text-align: center;

  width: 136px;
  height: 40px;
  background: #FFFFFF;
  border-radius: 20px;

  cursor: pointer;

  transition: all 0.1s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }

`

const ButtonGust = styled.div`
  font-size: 14px;
  color: #FFFFFF;
  line-height: 40px;
  text-align: center;

  width: 136px;
  height: 40px;
  border: 1px solid #898989;
  border-radius: 20px;

  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    border: 1px solid #FFFFFF;
  }

`

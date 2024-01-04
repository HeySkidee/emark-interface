import React from "react";
import styled from "styled-components"
import MuiList, { MuiListItem } from "../../components/MuiList";
import {
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled, TbSquareRoundedNumber4Filled
} from "react-icons/tb";
import { PrimaryButton } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function GetStart() {
  const nav = useNavigate()

  return (
    <GetStartWrapper id={'get-start'}>
      <StepsWrapper>
        <StepsTitle>Get Started</StepsTitle>

        <MuiList>
          <MuiListItem
            title={'Connect Wallet'}
            description={'Connect your Web3 wallet'}
            icon={<TbSquareRoundedNumber1Filled size={24}/>}
          />
          <MuiListItem
            title={'Choose Ticker'}
            description={'Choose your favorite Ticker'}
            icon={<TbSquareRoundedNumber2Filled size={24}/>}
          />
          <MuiListItem
            title={'Deploy & Mint'}
            description={'Deploy or Mint it'}
            icon={<TbSquareRoundedNumber3Filled size={24}/>}
          />
          <MuiListItem
            title={'Earn income'}
            description={'Earn income through markets and exchanges'}
            icon={<TbSquareRoundedNumber4Filled size={24}/>}
          />
        </MuiList>

        <PrimaryButton onClick={() => nav('/inscribe')} style={{width: '100%'}}>
          START NOW
        </PrimaryButton>
      </StepsWrapper>
    </GetStartWrapper>
  )
}

const StepsTitle = styled.h1`
  font-weight: normal;
  color: white;
`

const StepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const GetStartWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
`

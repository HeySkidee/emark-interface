import React from "react";
import styled from "styled-components"
import Icon_next from "../../assets/images/icon_next.png"
import { BiAtom } from "react-icons/bi";
import { ImCalculator } from "react-icons/im";
import { FaPiggyBank } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";

export default function TheProcess() {
  return (
    <Content id={'learn'}>
      <Title>
        THE PROCESS
      </Title>
      <SubTitle>
        The project party deploys the token and then asks the user to go to Mint. We will calculate the reward at the end of Mint, and then the project party can claim the reward.
      </SubTitle>

      <RowWrapper>
        <Box>
          <IconWrapper>
            <FaSquarePlus size={28}/>
          </IconWrapper>
          <BoxTitle>Deploy Tokens</BoxTitle>
          <BoxSubTitle>
            Projects deploy their own symbolic tokens
          </BoxSubTitle>
        </Box>
        <Next src={Icon_next}/>
        <Box>
          <IconWrapper>
            <ImCalculator size={28}/>
          </IconWrapper>
          <BoxTitle>
            Mint Tokens
          </BoxTitle>
          <BoxSubTitle>
            Let players go to Mint token
          </BoxSubTitle>
        </Box>
        <Next src={Icon_next}/>
        <Box>
          <IconWrapper>
            <BiAtom size={28}/>
          </IconWrapper>
          <BoxTitle>Reward Calculation</BoxTitle>
          <BoxSubTitle>
            We will calculate the reward when Mint is completed
          </BoxSubTitle>
        </Box>
        <Next src={Icon_next}/>
        <Box>
          <IconWrapper>
            <FaPiggyBank size={28}/>
          </IconWrapper>
          <BoxTitle>
            Earn Tokens
          </BoxTitle>
          <BoxSubTitle>
            Claim your percentage of the previous epoch tokens from the dashboard in the next epoch
          </BoxSubTitle>
        </Box>
      </RowWrapper>
    </Content>
  )
}

const IconWrapper = styled.div`
  min-width: 56px;
  color: rgb(255, 255, 255);
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 0;
  height: 240px;

  @media (max-width: 1100px) {
    flex-direction: column;
    height: auto;
  }
`

const Title = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #FFFFFF;
  margin-top: 60px;
  text-align: center;
`

const SubTitle = styled.div`
  font-size: 18px;
  color: #FFFFFF;
  margin-top: 20px;
  text-align: center;
`

const Next = styled.img`
  width: 35px;
  height: 35px;
  margin: 20px;
  transform: rotate(0deg);

  @media (max-width: 1100px) {
    transform: rotate(90deg);
  }
`

const Box = styled.div`
  border-radius: 14px;
  border: 1px solid #333333;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  padding: 20px;

  > * {
    margin-bottom: 10px;
  }
`

const BoxTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 24px;
`

const BoxSubTitle = styled.div`
  font-size: 16px;
  color: #FFFFFF;
  line-height: 24px;
`

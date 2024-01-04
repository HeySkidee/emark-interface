import React from "react";
import styled from "styled-components"
import Icon1 from "../../assets/images/icon1.png"
import Icon2 from "../../assets/images/icon2.png"
import Icon3 from "../../assets/images/icon3.png"
import Icon4 from "../../assets/images/icon4.png"

export default function Advantages() {
  return (
    <Content>
      <Line/>
      <Title>Platform advantages</Title>
      <Box>
        <BoxIcon src={Icon1}/>
        <BoxTitle>Innovation mechanism</BoxTitle>
        <BoxSubTitle>MMC introduces unique innovative mechanisms, including decentralized exchange (DEX),
          staking mining and DAO governance, to provide users with more opportunities to earn and participate
          . We actively explore new blockchain applications and constantly introduce new ones to meet the
          needs of different users.</BoxSubTitle>
      </Box>
      <Box>
        <BoxIcon src={Icon2}/>
        <BoxTitle>Matrix placement</BoxTitle>
        <BoxSubTitle>We provide advertisers with multi-channel advertising options, including Twitter, Weibo,
          Facebook, Instagram and other platforms, allowing advertisers to reach their target audiences more
          accurately. Advertisers can use M MC tokens to pay advertising fees to ensure convenient and
          efficient advertising.</BoxSubTitle>
      </Box>
      <Box>
        <BoxIcon src={Icon3}/>
        <BoxTitle>Real interaction</BoxTitle>
        <BoxSubTitle>MMC encourages users to actively participate in platform interaction and promotes
          communication , questions and feedback between users through user dialogue windows. Additionally,
          our Candy Pool staking mining event rewards user participation, providing a real incentive
          mechanism.</BoxSubTitle>
      </Box>
      <Box style={{marginBottom: '60px'}}>
        <BoxIcon src={Icon4}/>
        <BoxTitle>Compliance and security</BoxTitle>
        <BoxSubTitle>The safety and compliance of our users and advertisers is our top priority. During the
          development and operation of the platform, we will strictly follow regulations and implement KYC
          processes to ensure the security of user information and assets. At the same time, we ensure the
          security of the platform through smart contract audits and security policies.</BoxSubTitle>
      </Box>
    </Content>
  )
}

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #FFFFFF;
  margin-top: 60px;
  margin-bottom: 40px;

  text-align: center;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #333333;
`

const Box = styled.div`
  width: 100%;
  border-radius: 14px;
  border: 1px solid #333333;

  display: flex;
  flex-direction: column;
  margin-top: 10px;
`

const BoxIcon = styled.img`
  width: 36px;
  height: 36px;
  margin: 32px 0 0 32px
`

const BoxTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #FFFFFF;
  margin: 20px 32px 0 32px
`

const BoxSubTitle = styled.div`
  font-size: 16px;
  color: #FFFFFF;
  line-height: 28px;
  margin: 20px 32px 30px 32px
`


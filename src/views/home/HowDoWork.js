import React from "react";
import styled from "styled-components"
import MuiList, { MuiListItem } from "../../components/MuiList";
import { FaCode, FaGift, FaSatelliteDish } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";

export default function HowDoWork() {
  return (
    <Content>
      <RowWrapper>
        <ColWrapper>
          <TitleLeft>
            How it works
          </TitleLeft>
          <TitleLeftSmall>
            E-MARK is an open source protocol based on the Evm chain that anyone can deploy. E-MARK will regularly
            issue airdrops for contributions (Mint, Deploy), and the deployer will receive 20% of the Mint fee.
          </TitleLeftSmall>

          <MuiList>
            <MuiListItem
              title={'Any engraving'}
              description={'Anyone can Mint and Deploy'}
              icon={<FaSatelliteDish size={24}/>}
            />
            <MuiListItem
              title={'Open protocol'}
              description={'Using BRC-20\'s ordinals protocol'}
              icon={<FaCode size={24}/>}
            />
            <MuiListItem
              title={'Super low cost'}
              description={'We charge very low fees, 20 times less than BRC20 words'}
              icon={<BsLightningChargeFill size={24}/>}
            />
            <MuiListItem
              title={'There are rewards'}
              description={'MARK-20 deployers can enjoy 20% of Mint fees'}
              icon={<FaGift size={24}/>}
            />
          </MuiList>
        </ColWrapper>
      </RowWrapper>
    </Content>
  )
}

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleLeft = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #FFFFFF;
`

const TitleLeftSmall = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 28px;
`

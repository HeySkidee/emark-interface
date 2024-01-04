import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Card, Descriptions, Flex, message, Progress, Space, Tabs } from "antd";
import LinearTitle from "../components/LinearTitle";
import { getToken } from "../services/token";
import moment from "moment/moment";
import Transfers from "../views/token/Transfers";
import Holders from "../views/token/Holders";

export default function Token() {
  const {tick} = useParams()

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const msg = await getToken(tick)
        if (msg.data.code === 0) {
          setToken(msg.data.data)
        } else {
          message.warning(msg.data.message)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    if (tick) {
      fetch()
    }
  }, [tick]);

  const items = [
    {
      key: 'holders',
      label: 'Holders',
      children: <Holders tick={tick} token={token}/>,
    },
    {
      key: 'transfers',
      label: 'Transfers',
      children: <Transfers tick={tick}/>,
    },
  ];

  return (
    <Wrapper>
      <Flex justify={"center"}>
        <LinearTitle>{tick}</LinearTitle>
      </Flex>
      {
        token ? (
          <Progress size={'small'} percent={(token.totalSupply / token.max * 100).toFixed(0)}/>
        ) : null
      }

      <Card
        loading={loading}
        bordered={false}
        title={'Overview'}
        extra={<Space>
          <Button type={'primary'}
                  href={`/inscribe?op=mint&tick=${tick}`}>Mint</Button>
        </Space>}
      >
        {
          token && (
            <Descriptions>
              <Descriptions.Item span={3} label={'TxHash'}>
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href={`https://etherscan.io/tx/${token.txId}`}
                >
                  {token.txId}
                </a>
              </Descriptions.Item>
              <Descriptions.Item span={3} label={'Deploy At'}>
                {moment(token.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item span={3} label={'Block Number'}>
                {token.blockNumber}
              </Descriptions.Item>
              <Descriptions.Item span={3} label={'Deployer'}>
                {token.deployer}
              </Descriptions.Item>
              <Descriptions.Item span={3} label={'Decimals'}>
                {token.decimals}
              </Descriptions.Item>
              <Descriptions.Item span={3} label={'Max Supply'}>
                {Number(token.max).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item span={3} label={'Total Supply'}>
                {Number(token.totalSupply).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item span={3} label={'Limit per mint'}>
                {Number(token.limit).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          )
        }
      </Card>

      <Card style={{marginTop: '20px'}} bordered={false}>
        <Tabs items={items}/>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 70em;
  margin: 0 auto;
`

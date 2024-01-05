import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Card, Flex, message, Progress, Segmented, Space, Tooltip, Typography } from "antd";
import moment from "moment";
import { getTokens } from "../services/token";
import { shortAddress } from "../utils/address";
import LinearTitle from "../components/LinearTitle";
import scan from "../assets/images/scan.png";
import { Link } from "react-router-dom";
import { ProTable } from "@ant-design/pro-components";

export default function Tokens() {
  const actionRef = useRef()
  const [state, setState] = useState(0)

  useEffect(() => {
    if (actionRef.current){
      actionRef.current.reload()
    }
  }, [state]);

  const fetch = useCallback(async (params, sort, filter) => {
    try {
      const msg = await getTokens({
        page: params.current,
        limit: params.pageSize,
        state,
        sort: JSON.stringify(sort),
      })
      if (msg.data.code === 0) {
        return {
          data: msg.data.data.list,
          total: msg.data.data.total,
          success: true,
        };
      } else {
        message.error(msg.data.message)
        return {
          success: false,
        };
      }
    } catch (e) {
      console.log(e)
    }
  }, [state])

  return (
    <Wrapper>
      <Flex justify={"center"}>
        <LinearTitle>Tokens</LinearTitle>
      </Flex>

      <Card bordered={false}>
        <Flex justify={'center'}>
          <Typography.Title level={5}>
            The full list of E-MARK tokens
          </Typography.Title>
        </Flex>

        <Flex justify={'center'}>
          <Segmented
            value={state}
            onChange={(e) => setState(e)}
            options={[
              {label: 'All', value: 0},
              {label: 'In-Progress', value: 1},
              {label: 'Completed', value: 2},
            ]}/>
        </Flex>

        <TableWrapper>
          <ProTable
            columns={[
              {
                dataIndex: 'txId',
                title: 'Hash',
                render: (text) => (
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    style={{display: "flex", alignItems: 'center'}}
                    href={`https://etherscan.io/tx/${text}`}
                  >
                    <img height={20} alt={''} src={scan}/>
                  </a>
                )
              },
              {
                dataIndex: 'tick',
                title: 'Tick',
                render: (text) => (
                  <Link to={`/tokens/${text}`}>
                    {text}
                  </Link>
                )
              },
              {
                dataIndex: 'timestamp',
                title: 'Deploy At',
                sorter: true,
                render: (text, record) => {
                  return moment(record.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss')
                }
              },
              {
                dataIndex: 'blockNumber',
                title: 'Block',
              },
              {
                title: 'Progress',
                render: (_, record) => (
                  <Progress size={'small'} percent={(record.totalSupply / record.max * 100).toFixed(0)}/>
                )
              },
              {
                dataIndex: 'deployer',
                title: 'Deployer',
                render: (text) => (
                  <Tooltip title={text}>
                    {shortAddress(text)}
                  </Tooltip>
                )
              },
              {
                title: 'Action',
                render: (_, record) => (
                  <Space>
                    <Button size={'small'} type={'primary'}
                            href={`/inscribe?op=mint&tick=${record.tick}`}>Mint</Button>
                  </Space>
                )
              },
            ]}
            actionRef={actionRef}
            rowKey={'tick'}
            request={fetch}
            search={false}
            toolBarRender={false}
          />
        </TableWrapper>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 70em;
  margin: 0 auto;
`

const TableWrapper = styled.div`
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 20px;
`
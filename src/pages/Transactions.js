import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { Card, Flex, message, Tooltip, Typography } from "antd";
import moment from "moment";
import { getTxs } from "../services/token";
import { shortAddress } from "../utils/address";
import LinearTitle from "../components/LinearTitle";

import scan from '../assets/images/scan.png'
import InscriptionRaw from "../components/InscriptionRaw";
import { ProTable } from "@ant-design/pro-components";

export default function Transactions() {
  const actionRef = useRef()

  const fetch = useCallback(async (params, sort, filter) => {
    try {
      const msg = await getTxs({
        page: params.current,
        limit: params.pageSize,
        sort: JSON.stringify(sort),
        ...filter
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
  }, [])

  return (
    <Wrapper>
      <Flex justify={"center"}>
        <LinearTitle>Indexer</LinearTitle>
      </Flex>

      <Card bordered={false}>
        <Flex justify={'center'}>
          <Typography.Title level={5}>
            The full list of confirmed transaction.
          </Typography.Title>
        </Flex>

        <TableWrapper>
          <ProTable
            columns={[
              {
                dataIndex: 'id',
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
                dataIndex: 'raw',
                title: 'Raw',
                render: (text) => <InscriptionRaw value={text}/>
              },
              {
                dataIndex: 'timestamp',
                title: 'Time',
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
                dataIndex: 'action',
                title: 'Action',
                render: (text) => text.toUpperCase()
              },
              {
                dataIndex: 'user',
                title: 'From',
                render: (text) => (
                  <Tooltip title={text}>
                    {shortAddress(text)}
                  </Tooltip>
                )
              },
              {
                dataIndex: 'toUser',
                title: 'To',
                render: (text) => (
                  <Tooltip title={text}>
                    {shortAddress(text)}
                  </Tooltip>
                )
              },
            ]}
            actionRef={actionRef}
            rowKey={'id'}
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
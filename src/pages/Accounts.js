import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button, Card, Flex, message, Space, Tooltip, Typography } from "antd";
import { getAccounts } from "../services/token";
import LinearTitle from "../components/LinearTitle";
import { useAccount } from "wagmi";
import { shortAddress } from "../utils/address";
import { ProTable } from "@ant-design/pro-components";

export default function Accounts() {
  const {address} = useAccount()
  const actionRef = useRef()

  useEffect(() => {
    if (actionRef.current) {
      actionRef.current.reload()
    }
  }, [address]);

  const fetch = useCallback(async (params, sort, filter) => {
    try {
      const msg = await getAccounts({
        page: params.current,
        limit: params.pageSize,
        sort: JSON.stringify(sort),
        user: address
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
  }, [address])

  return (
    <Wrapper>
      <Flex justify={"center"}>
        <LinearTitle>Accounts</LinearTitle>
      </Flex>

      <Card bordered={false}>
        <Flex justify={'center'}>
          <Typography.Title level={5}>
            Account balance of E-MARK tokens
          </Typography.Title>
        </Flex>

        <TableWrapper>
          <ProTable
            columns={[
              {
                dataIndex: 'user',
                title: 'User',
                render: (text) => (
                  <Tooltip title={text}>
                    {shortAddress(text)}
                  </Tooltip>
                )
              },
              {
                dataIndex: 'tick',
                title: 'Tick',
              },
              {
                dataIndex: 'balance',
                title: 'Balance',
                sorter: true,
              },
              {
                title: 'Action',
                render: (_, record) => (
                  <Space>
                    <Button size={'small'} type={'primary'}
                            href={`/inscribe?op=transfer&tick=${record.tick}`}>Transfer</Button>
                  </Space>
                )
              },
            ]}
            actionRef={actionRef}
            rowKey={(record) => record.user + record.tick}
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
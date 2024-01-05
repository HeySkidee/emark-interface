import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { message, Progress } from "antd";
import { shortAddress } from "../../utils/address";
import { getAccounts } from "../../services/token";
import { ProTable } from "@ant-design/pro-components";

export default function Holders({tick, token}) {
  const actionRef = useRef()

  const fetch = useCallback(async (params, sort, filter) => {
    try {
      const msg = await getAccounts({
        page: params.current,
        limit: params.pageSize,
        sort: JSON.stringify(sort),
        tick
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
  }, [tick])

  return (
    <TableWrapper>
      <ProTable
        size={'small'}
        columns={[
          {
            dataIndex: 'user',
            title: 'User',
            render: (text) => (
              <a
                target={"_blank"}
                rel="noreferrer"
                href={`https://etherscan.io/address/${text}`}
              >
                {shortAddress(text)}
              </a>
            )
          },
          {
            title: 'Percentage',
            render: (_, record) => (
              <Progress
                size={'small'}
                percent={(token ? token.totalSupply / record.balance * 100 : 0).toFixed(0)}
              />
            )
          },
          {
            dataIndex: 'balance',
            title: 'Balance',
            sorter: true,
          },
        ]}
        actionRef={actionRef}
        rowKey={(record) => record.user + record.tick}
        request={fetch}
        search={false}
        toolBarRender={false}
      />
    </TableWrapper>
  )
}

const TableWrapper = styled.div`
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 20px;
`
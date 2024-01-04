import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Progress, Table } from "antd";
import { shortAddress } from "../../utils/address";
import { getAccounts } from "../../services/token";

export default function Holders({tick, token}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetch = async () => {
    setLoading(true)
    try {
      const msg = await getAccounts({
        page: tableParams.pagination.current,
        limit: tableParams.pagination.pageSize,
        sort: JSON.stringify({[tableParams.field]: tableParams.order}),
        tick,
      })
      if (msg.data.code === 0) {
        setData(msg.data.data.list);

        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: msg.data.data.total,
          },
        });
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <TableWrapper>

      <Table
        size={'small'}
        style={{marginTop: '20px'}}
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
        rowKey={(record) => record.user + record.tick}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </TableWrapper>
  )
}

const TableWrapper = styled.div`
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
`
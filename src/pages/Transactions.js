import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Flex, Table, Tooltip, Typography } from "antd";
import moment from "moment";
import { getTxs } from "../services/token";
import { shortAddress } from "../utils/address";
import LinearTitle from "../components/LinearTitle";

import scan from '../assets/images/scan.png'
import InscriptionRaw from "../components/InscriptionRaw";

export default function Transactions() {
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
      const msg = await getTxs({
        page: tableParams.pagination.current,
        limit: tableParams.pagination.pageSize,
        sort: JSON.stringify({[tableParams.field]: tableParams.order}),
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

          <Table
            style={{marginTop: '20px'}}
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
            rowKey={'id'}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
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
`
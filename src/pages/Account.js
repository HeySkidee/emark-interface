import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Card, Flex, Space, Table, Typography } from "antd";
import { getAccounts } from "../services/token";
import LinearTitle from "../components/LinearTitle";
import { useAccount } from "wagmi";
import { shortAddress } from "../utils/address";

export default function Account() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const {address} = useAccount()

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
        user: address,
        sort: JSON.stringify({[tableParams.field]: tableParams.order}),
        ...tableParams.filters,
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
        <LinearTitle>Account</LinearTitle>
      </Flex>

      <Card bordered={false}>
        <Flex justify={'center'}>
          <Typography.Title level={5}>
            Account balance of E-MARK tokens
          </Typography.Title>
        </Flex>

        <TableWrapper>
          <Table
            style={{marginTop: '20px'}}
            columns={[
              {
                dataIndex: 'user',
                title: 'User',
                render: (text) => shortAddress(text)
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
            rowKey={(record) => record.user + record.tick}
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
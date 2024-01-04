import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Card, Flex, Progress, Segmented, Space, Table, Tooltip, Typography } from "antd";
import moment from "moment";
import { getTokens } from "../services/token";
import { shortAddress } from "../utils/address";
import LinearTitle from "../components/LinearTitle";
import scan from "../assets/images/scan.png";
import { Link } from "react-router-dom";

export default function Tokens() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState(0)

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetch = async () => {
    setLoading(true)
    try {
      const msg = await getTokens({
        page: tableParams.pagination.current,
        limit: tableParams.pagination.pageSize,
        state,
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
  }, [JSON.stringify(tableParams), state]);

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

          <Table
            style={{marginTop: '20px'}}
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
            rowKey={'tick'}
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
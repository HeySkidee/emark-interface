import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Card, Flex, Segmented, Typography } from "antd";
import LinearTitle from "../components/LinearTitle";
import Mint from "../views/inscribe/Mint";
import Deploy from "../views/inscribe/Deploy";
import Transfer from "../views/inscribe/Transfer";
import useParsedQueryString from "../hooks/useParsedQueryString";

export default function Inscribe() {
  const [current, setCurrent] = useState('mint')

  const [form, setForm] = useState(null)
  const query = useParsedQueryString()

  useEffect(() => {
    if (query && query.op) {
      setCurrent(query.op)

      switch (query.op) {
        case 'mint':
          setCurrent(query.op)
          setForm({
            tick: query.tick
          })
          break
        case 'deploy':
          setCurrent(query.op)
          setForm({
            tick: query.tick
          })
          break
        case 'transfer':
          setCurrent(query.op)
          setForm({
            tick: query.tick,
          })
          break
        default:
      }

    }
  }, [query]);

  return (
    <Wrapper>
      <Flex justify={"center"}>
        <LinearTitle>Inscribe</LinearTitle>
      </Flex>

      <Card bordered={false}>
        <Flex justify={'center'}>
          <Typography.Title level={5}>
            Mint, deploy or transfer your inscriptions
          </Typography.Title>
        </Flex>
        <Flex justify={'center'}>
          <Segmented
            onChange={(e) => setCurrent(e)}
            value={current}
            options={[
              {label: 'Mint', value: 'mint'},
              {label: 'Deploy', value: 'deploy'},
              {label: 'Transfer', value: 'transfer'},
            ]}/>
        </Flex>

        <FormWrapper>
          {
            current === 'mint' && <Mint current={form}/>
          }
          {
            current === 'deploy' && <Deploy current={form}/>
          }
          {
            current === 'transfer' && <Transfer current={form}/>
          }
        </FormWrapper>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 45em;
  margin: 0 auto;
`

const FormWrapper = styled.div`
  margin-top: 30px;
`
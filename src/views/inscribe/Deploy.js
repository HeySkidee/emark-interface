import { Alert, Button, Divider, Form, Input, InputNumber, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseUnits, stringToHex } from "viem";
import { FACTORY } from "../../constants";
import { waitForTransaction } from "@wagmi/core";
import { getToken } from "../../services/token";

const Deploy = ({current}) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const tick = Form.useWatch('tick', {form, preserve: true});
  const [token, setToken] = useState(null)

  const {address} = useAccount()

  useEffect(() => {
    const check = async () => {
      setLoading(true)
      try {
        const msg = await getToken(tick)

        if (msg.data.code === 0) {
          setToken(msg.data.data)
        } else {
          setToken(null)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    if (tick && tick.length === 4) {
      check()
    } else {
      setToken(null)
    }
  }, [tick]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({...current})
    }
  }, [form, current]);

  const {sendTransactionAsync} = useSendTransaction()

  const handleFinish = useCallback(async (values) => {
    const data = `data:,` + JSON.stringify({
      p: 'mark-20',
      op: 'deploy',
      tick: values.tick,
      max: String(values.max),
      lim: String(values.limit)
    })
    console.log(data)

    setLoading(true)
    try {
      const tx = await sendTransactionAsync({
        value: parseUnits('0.001', 18),
        data: stringToHex(data),
        to: FACTORY
      })

      await waitForTransaction({
        hash: tx.hash,
        confirmations: 3,
      })

      message.success('Deploy Success')
    } catch (e) {
      console.log(e)
      message.error('Fail')
    } finally {
      setLoading(false)
    }
  }, [sendTransactionAsync])

  return (
    <Form
      form={form}
      labelCol={{span: 6}}
      wrapperCol={{span: 12}}
      onFinish={handleFinish}
    >
      {tick && tick.length === 4 && !loading && token ? (
        <Alert style={{marginBottom: '25px'}}
               showIcon
               type={'warning'}
               message={'This ticker has deployed.'}/>
      ) : null}

      <Form.Item
        label={'Tick'}
        name={'tick'}
        rules={[
          {required: true, message: 'required'},
          {len: 4, message: 'length 4'},
        ]}
      >
        <Input placeholder={'4 characters like "mark"...'}/>
      </Form.Item>

      <Form.Item
        label={'Total Supply'}
        name={'max'}
        rules={[{required: true, message: 'required'}]}
      >
        <InputNumber style={{width: '100%'}} min={1}/>
      </Form.Item>

      <Form.Item
        label={'Limit Per Mint'}
        name={'limit'}
        rules={[{required: true, message: 'required'}]}
      >
        <InputNumber style={{width: '100%'}} min={1}/>
      </Form.Item>

      <Divider/>

      <Form.Item wrapperCol={{xs: {offset: 0}, md: {offset: 6, span: 12}}}>
        <Button disabled={!address} block loading={loading} type="primary" htmlType="submit">
          Deploy
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Deploy
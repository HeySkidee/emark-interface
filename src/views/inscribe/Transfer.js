import { Button, Divider, Form, Input, InputNumber, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { stringToHex } from "viem";
import { waitForTransaction } from "@wagmi/core";

const Transfer = ({current, isStart}) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const {address} = useAccount()

  useEffect(() => {
    if (current) {
      form.setFieldsValue({...current})
    }
  }, [form, current]);

  const {sendTransactionAsync} = useSendTransaction()

  const handleFinish = useCallback(async (values) => {
    const data = `data:,` + JSON.stringify({
      p: 'mark-20',
      op: 'transfer',
      tick: values.tick,
      amt: String(values.amount),
    })

    setLoading(true)
    try {
      const tx = await sendTransactionAsync({
        data: stringToHex(data),
        to: values.to,
      })

      await waitForTransaction({
        hash: tx.hash,
        confirmations: 3,
      })

      message.success('Transfer Success')
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
        label={'Amount'}
        name={'amount'}
        rules={[{required: true, message: 'required'}]}
      >
        <InputNumber style={{width: '100%'}} min={0}/>
      </Form.Item>

      <Form.Item
        label={'To'}
        name={'to'}
        rules={[{required: true, message: 'required'}]}
      >
        <Input/>
      </Form.Item>

      <Divider/>

      <Form.Item wrapperCol={{xs: {offset: 0}, md: {offset: 6, span: 12}}}>
        <Button disabled={!address || !isStart} block loading={loading} type="primary" htmlType="submit">
          Transfer
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Transfer
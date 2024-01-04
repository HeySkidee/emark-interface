import styled from "styled-components";
import { Button } from "antd";
import { useAccount, useConnect } from "wagmi";
import { shortAddress } from "../../utils/address";
import { useCallback } from "react";

export default function ConnectButton() {
  const {address, isConnected} = useAccount()
  const {connect, connectors, isLoading} = useConnect()

  const handleConnect = useCallback(() => {
    connect({connector: connectors[0], chainId: 1})
  }, [connect, connectors])

  return (
    <ConnectButtonWrapper>
      {
        isConnected ? (
          <Button type={'primary'}>{shortAddress(address)}</Button>
        ) : (
          <Button type={'primary'} loading={isLoading} onClick={handleConnect}>Connect</Button>
        )
      }
    </ConnectButtonWrapper>
  )
}

const ConnectButtonWrapper = styled.div`
`
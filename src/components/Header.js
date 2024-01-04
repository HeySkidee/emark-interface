import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu } from "antd";
import {
  FiDatabase,
  FiAnchor,
  FiCode,
  FiEdit,
  FiMoreHorizontal,
  FiShoppingBag,
  FiZap,
  FiCompass
} from "react-icons/fi";
import logo from '../assets/images/logo.png'
import ConnectButton from "./ConnectButton";

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  const [current, setCurrent] = useState('')
  const items = [
    {
      label: 'Account',
      key: 'account',
      icon: <FiDatabase/>
    },
    {
      label: 'Inscribe',
      key: 'inscribe',
      icon: <FiEdit/>
    },
    {
      label: 'Tokens',
      key: 'tokens',
      icon: <FiCode/>
    },
    {
      label: 'Indexer',
      key: 'indexer',
      icon: <FiCompass/>
    },
    {
      label: 'Market',
      key: 'market',
      icon: <FiShoppingBag/>,
      disabled: true,
    },
    {
      label: 'Staking',
      key: 'staking',
      icon: <FiAnchor/>,
      disabled: true,
    },
    {
      label: 'Swap',
      key: 'swap',
      icon: <FiZap/>,
      disabled: true,
    },
  ]

  useEffect(() => {
    const e = items.find(e => location.pathname.indexOf(e.key) >= 0)
    if (e) {
      setCurrent(e.key)
    } else {
      setCurrent('')
    }
    // eslint-disable-next-line
  }, [location]);

  const onClick = (e) => {
    navigate(`/${e.key}`)
  };

  return (
    <Wrapper>
      <LogoWrapper to={'/'}>
        <img alt={''} src={logo}/>
      </LogoWrapper>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        overflowedIndicator={<FiMoreHorizontal/>}
        style={{
          border: 0,
          flex: 1,
          minWidth: 0,
          marginLeft: '20px'
        }}
      />

      <RightWrapper>
        <ConnectButton/>
      </RightWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background: #111;
  position: fixed;
  z-index: 100;

  display: flex;
  align-items: center;
  padding: 10px;
  flex: 0 0 auto;
`

const LogoWrapper = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;

  > img {
    width: 32px;
  }
`

const RightWrapper = styled.div`
`
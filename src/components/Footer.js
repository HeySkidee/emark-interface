import React from "react";
import styled from "styled-components"
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <Wrapper>
      <CopyrightText>© 2024 The E-MARK</CopyrightText>

      <MediaLinkWrapper>
        <MediaLink target={'_blank'} href={'https://twitter.com/emark_20'}><FaTwitter size={24}/></MediaLink>
        <MediaLink target={'_blank'} href={'https://github.com/emarkorg'}><FaGithub size={24}/></MediaLink>
      </MediaLinkWrapper>
    </Wrapper>
  )
}

const MediaLink = styled.a`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #aaa;
  }
`

const MediaLinkWrapper = styled.div`
  margin-top: 10px;
  display: flex;

  > * {
    padding-right: 10px;

    &:last-child {
      padding-right: 0;
    }
  }
`

const CopyrightText = styled.div`
  font-size: 13px;
  color: #FFFFFF;
`

const Wrapper = styled.div`
  height: 175px;
  border-top: 1px solid #333333;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

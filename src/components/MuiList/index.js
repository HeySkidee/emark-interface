import styled from "styled-components";
import React from "react";

export default function MuiList({children}) {
  return (
    <ListWrapper>
      {children}
    </ListWrapper>
  )
}

export function MuiListItem({icon, title, description}) {
  return (
    <ListItemWrapper>
      <ListIconWrapper>
        {icon}
      </ListIconWrapper>

      <MuiListItemText>
        <MuiListItemTextTitle>
          {title}
        </MuiListItemTextTitle>
        <MuiListItemTextDescription>
          {description}
        </MuiListItemTextDescription>
      </MuiListItemText>
    </ListItemWrapper>
  )
}

const MuiListItemTextDescription = styled.p`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  color: rgba(255, 255, 255, 0.7);
  display: block;
`

const MuiListItemTextTitle = styled.span`
  margin: 0;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  display: block;
`

const MuiListItemText = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 6px;
  margin-bottom: 6px;
`

const ListIconWrapper = styled.div`
  min-width: 56px;
  color: rgb(255, 255, 255);
  flex-shrink: 0;
  display: inline-flex;
`

const ListItemWrapper = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  padding: 8px 16px;
`


const ListWrapper = styled.ul`
  list-style: none;
  color: white;
  padding: 8px 0;
  position: relative;
`
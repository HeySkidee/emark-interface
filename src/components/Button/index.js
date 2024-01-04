import styled from "styled-components";
import { Spin } from "antd";

export function PrimaryButton({children, loading, disabled, ...rest}) {
  return (
    <StyledPrimaryButton disabled={disabled} {...rest}>
      {loading ? <Spin/> : null}
      <div>{children}</div>
    </StyledPrimaryButton>
  )
}

const StyledPrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  min-width: 64px;
  padding: 6px 16px;
  border-radius: 10000px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: #000;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;

  > * {
    margin-right: 5px;

    &:last-child {
      margin-right: 0;
    }
  }

  &:hover {
    text-decoration: none;
    background-color: rgb(178, 178, 178);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  }

  &[disabled] {
    pointer-events: none;
    background-color: rgb(178, 178, 178);
  }
`

import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'

export default class Field extends PureComponent {
  render() {
    const { icon, ...rest } = this.props

    return (
      <FieldWrapper>
        <Input iconed={icon} {...rest} />
        {icon && <Icon src={icon} />}
      </FieldWrapper>
    )
  }
}

const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  height: 5rem;
  padding: 1.4rem 10px 1.6rem;
  border: 1px solid #dfdfdf;
  border-radius: 7px;
  line-height: 2rem;

  :focus::placeholder {
    transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
  }

  ${p =>
    p.iconed &&
    css`
      padding-left: 50px;
    `};
`

const Icon = styled.span`
  position: absolute;
  top: 1.4rem;
  left: 20px;
  height: 1.9rem;
  width: 1.9rem;
  background-image: url(${p => p.src});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  opacity: 0.4;
`

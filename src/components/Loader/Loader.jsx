import React, { PureComponent } from 'react'
import { GridLoader } from 'react-spinners'
import styled from 'styled-components'

class Loader extends PureComponent {
  render() {
    return (
      <Wrapper>
        <GridLoader color={'#5ebde4'} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
`

export default Loader

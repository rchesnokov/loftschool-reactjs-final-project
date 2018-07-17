import React, { PureComponent } from 'react'
import styled from 'styled-components'

class Table extends PureComponent {
  render() {
    const { content } = this.props

    return (
      <STable>
        {content &&
          content.map(row => <tr>{row.map(cell => <Cell>{cell}</Cell>)}</tr>)}
      </STable>
    )
  }
}

const STable = styled.table`
  border-spacing: 0;
`

const Cell = styled.td`
  padding: 0 0 16px;
`

export default Table

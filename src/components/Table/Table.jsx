import React, { PureComponent } from 'react'
import styled from 'styled-components'

class Table extends PureComponent {
  renderCells = row => row.map(cell => <Cell>{cell}</Cell>)

  render() {
    const { content } = this.props

    return (
      <STable>
        {content && content.map(row => <tr>{this.renderCells(row)}</tr>)}
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

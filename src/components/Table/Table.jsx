import React, { PureComponent } from 'react'
import styled from 'styled-components'

class Table extends PureComponent {
  renderCells = row => row.map((cell, i) => <Cell key={i}>{cell}</Cell>)

  render() {
    const { content } = this.props

    return (
      <STable>
        <tbody>
          {content &&
            content.map((row, i) => <tr key={i}>{this.renderCells(row)}</tr>)}
        </tbody>
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

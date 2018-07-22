import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import {
  fetchTransactionsRequest,
  getFormattedTransactions,
} from 'modules/transactions/index'
import { getSelected as getSelectedCurrency } from 'modules/currency/index'
import arrow from './images/angle-pointing-to-left.svg'

const mapStateToProps = state => ({
  selectedCurrency: getSelectedCurrency(state),
  transactions: getFormattedTransactions(state),
})

const mapDispatchToProps = {
  fetchTransactionsRequest,
}

class History extends PureComponent {
  PER_PAGE_COUNT = 5

  state = {
    selectedPage: 0,
  }

  componentDidMount = () => {
    this.props.fetchTransactionsRequest()
  }

  handlePageClick = ({ selected }) => {
    this.setState({ selectedPage: selected })
  }

  renderTransactions() {
    const { transactions } = this.props
    const { selectedPage } = this.state
    const arrayStartIndex = selectedPage * this.PER_PAGE_COUNT

    if (!transactions.length) {
      return (
        <Fragment>
          <tr>
            <td colSpan="4" style={{ textAlign: 'center' }}>
              Транзакций нет
            </td>
          </tr>
        </Fragment>
      )
    }

    const transactionsToDisplay = transactions.slice(
      arrayStartIndex,
      arrayStartIndex + this.PER_PAGE_COUNT,
    )

    const transactionRows = transactionsToDisplay.map(transaction => (
      <tr key={transaction.id}>
        <td>{transaction.name}</td>
        <td>{transaction.created_at}</td>
        <td>{transaction.crypto_delta}</td>
        <td>{transaction.usd_delta}</td>
      </tr>
    ))

    const remainderRows =
      transactionsToDisplay.length < this.PER_PAGE_COUNT
        ? this.renderEmptyRows(transactionsToDisplay.length)
        : null

    return (
      <Fragment>
        {transactionRows}
        {remainderRows}
      </Fragment>
    )
  }

  renderEmptyRows(displayedLength) {
    const trs = Array(this.PER_PAGE_COUNT - displayedLength).fill(null)
    const tds = Array(4).fill(null)

    const emptyRows = trs.map((_, index) =>
      // prettier-ignore
      <tr key={index}>
        {tds.map((_, index) => <td key={index}>&nbsp;</td>)}
      </tr>,
    )

    return <Fragment>{emptyRows}</Fragment>
  }

  render() {
    const { selectedCurrency, transactions } = this.props

    return (
      <Wrapper>
        <Table>
          <thead>
            <tr>
              <th style={{ width: 130 + 'px' }}>Операция</th>
              <th style={{ width: 220 + 'px' }}>Дата</th>
              <th>{selectedCurrency.toUpperCase()}</th>
              <th>USD</th>
            </tr>
          </thead>
          <tbody>{this.renderTransactions()}</tbody>
        </Table>
        <Bottom>
          <ReactPaginate
            previousLabel={<Arrow icon={arrow} />}
            nextLabel={<ArrowRight icon={arrow} />}
            pageCount={transactions.length / this.PER_PAGE_COUNT}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </Bottom>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 5px;
`

const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  & th {
    padding: 10px 10px 10px 30px;
    background-color: #eef1f1;
    text-align: left;
  }

  & td {
    padding: 10px 10px 10px 30px;
    border: 1px solid #eef1f1;
  }
`

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  background-color: #eef1f1;
`

const Arrow = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 12px 12px;
  background-image: url(${p => p.icon});
`

const ArrowRight = Arrow.extend`
  transform: rotate(0.5turn);
`

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(History)

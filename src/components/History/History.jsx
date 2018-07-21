import React, { PureComponent } from 'react'
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
  componentDidMount = () => {
    this.props.fetchTransactionsRequest()
  }

  handlePageClick = () => {}

  render() {
    const { transactions, selectedCurrency } = this.props

    return (
      <Wrapper>
        <Table>
          <thead>
            <tr>
              <th>Операция</th>
              <th>Дата</th>
              <th>BTC</th>
              <th>USD</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map(t => (
                <tr key={t.id}>
                  <td>Покупка</td>
                  <td>{t.created_at}</td>
                  <td>{t[`${selectedCurrency}_delta`]}</td>
                  <td>{t.usd_delta}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Bottom>
          <ReactPaginate
            previousLabel={<Arrow icon={arrow} />}
            nextLabel={<ArrowRight icon={arrow} />}
            pageCount={1}
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

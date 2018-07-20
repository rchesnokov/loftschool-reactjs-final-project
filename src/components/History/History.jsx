import React, { PureComponent } from 'react'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import arrow from './images/angle-pointing-to-left.svg'

class History extends PureComponent {
  handlePageClick = () => {}

  render() {
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
            <tr>
              <td>Покупка</td>
              <td>19.10.17 20:02</td>
              <td>0.12332</td>
              <td>309</td>
            </tr>
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

export default History

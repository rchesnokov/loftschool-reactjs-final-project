import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import styled from 'styled-components'
import { getErrors, hideError } from 'modules/errors'
import closeIcon from './images/close.svg'

const mapStateToProps = state => ({
  errors: getErrors(state),
})

const mapDispatchToProps = {
  hideError,
}

class Errors extends PureComponent {
  componentDidUpdate = (prevProps, prevState) => {
    const newErrors = R.difference(this.props.errors, prevProps.errors)
    // For every new error set timeout 10s to auto close
    R.forEach(
      error =>
        setTimeout(() => {
          this.props.hideError(error.id)
        }, 10000),
      newErrors,
    )
  }

  closeError(id) {
    this.props.hideError(id)
  }

  render() {
    const { errors } = this.props
    return (
      <Fragment>
        {errors.slice(-3).map(
          error =>
            error.display ? (
              <Box key={error.id}>
                <Close onClick={this.closeError.bind(this, error.id)} />
                <Heading>{error.heading}</Heading>
                <Message>{error.message}</Message>
              </Box>
            ) : null,
        )}
      </Fragment>
    )
  }
}

const Box = styled.div`
  position: relative;
  min-height: 60px;
  width: 300px;
  padding: 12px 20px 12px 10px;
  margin-bottom: 20px;
  background-color: #de6764;
  border-radius: 5px;
  opacity: 0.97;
  line-height: 1.2;
  color: white;
`

const Heading = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
`

const Message = styled.div`
  font-size: 13px;
`

const Close = styled.button`
  position: absolute;
  top: 5px;
  right: 7px;
  height: 12px;
  width: 12px;
  padding: 3px;
  background: no-repeat 50% 50% url(${closeIcon});
  background-size: cover;
  background-color: transparent;
  border: none;
  font-size: 11px;
  font-weight: 700;
  color: white;
  cursor: pointer;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Errors)

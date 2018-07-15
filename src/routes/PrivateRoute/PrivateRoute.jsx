import React, { PureComponent } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getIsAuthorized } from 'ducks/auth'

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
})

class PrivateRoute extends PureComponent {
  render() {
    const { path, exact, component: Component, isAuthorized } = this.props

    return (
      <Route
        path={path}
        exact={exact}
        render={() => (isAuthorized ? <Component /> : <Redirect to="/login" />)}
      />
    )
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))

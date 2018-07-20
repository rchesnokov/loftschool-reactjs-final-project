import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import Layout from 'components/Layout'
import Dashboard from 'components/Dashboard'
import { logout } from 'ducks/auth'

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  logout,
}

export class AuthorizedRouter extends PureComponent {
  handleLogoutClick = () => {
    this.props.logout()
  }

  render() {
    return (
      <Layout logoutHandler={this.handleLogoutClick}>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    )
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthorizedRouter),
)

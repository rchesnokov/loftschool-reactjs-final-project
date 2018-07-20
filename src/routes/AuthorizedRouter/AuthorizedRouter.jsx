import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import Layout from 'components/Layout'
import Dashboard from 'components/Dashboard'
import { logout } from 'modules/auth'
import { getUserEmail } from 'modules/user'

const mapStateToProps = state => ({
  userEmail: getUserEmail(state),
})

const mapDispatchToProps = {
  logout,
}

export class AuthorizedRouter extends PureComponent {
  handleLogoutClick = () => {
    this.props.logout()
  }

  render() {
    const { userEmail } = this.props

    return (
      <Layout userEmail={userEmail} logoutHandler={this.handleLogoutClick}>
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

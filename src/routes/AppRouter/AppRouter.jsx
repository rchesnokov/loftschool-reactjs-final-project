// @flow

import React, { PureComponent } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import PropsRoute from 'routes/PropsRoute'
import PrivateRoute from 'routes/PrivateRoute'
import Auth from 'components/Auth'
import AuthorizedRouter from 'routes/AuthorizedRouter'

export class App extends PureComponent<{}> {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/trade" />} />
        <PropsRoute path="/login" component={Auth} state="login" />
        <PropsRoute path="/register" component={Auth} state="registration" />
        <PrivateRoute path="/trade" component={AuthorizedRouter} />
        <Redirect to="/" />
      </Switch>
    )
  }
}

export default withRouter(App)

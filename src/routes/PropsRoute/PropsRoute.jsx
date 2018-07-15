import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'

class PropsRoute extends PureComponent {
  render() {
    const { component: Component, path, exact, ...rest } = this.props

    return (
      <Route path={path} exact={exact} render={() => <Component {...rest} />} />
    )
  }
}

export default PropsRoute

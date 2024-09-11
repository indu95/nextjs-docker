import React from 'react'
import { CommonsServiceProvider } from '../context/CommonsContextService'

const withCommons =
  (Component) =>
  ({ ...props }) => {
    return (
      <CommonsServiceProvider>
        <Component {...props} withCommonsInjected={true} />
      </CommonsServiceProvider>
    )
  }

export default withCommons

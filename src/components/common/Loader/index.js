import { Backdrop, CircularProgress } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function Loader(props) {
  if (!process.browser) {
    return null
  }
  const [container] = useState(() => {
    // This will be executed only on the initial render
    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    return document.createElement('div')
  })
  const { show } = props
  useEffect(() => {
    container.classList.add('sl-loader')
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return show
    ? ReactDOM.createPortal(
        <Backdrop open={show} sx={{ zIndex: 999999 }}>
          <CircularProgress />
        </Backdrop>,
        container
      )
    : null
}
Loader.propTypes = {
  show: PropTypes.bool.isRequired
}
export default Loader

import { css } from '@emotion/react'
import { Close } from '@mui/icons-material'
import { IconButton, Snackbar, SnackbarContent } from '@mui/material'
import { blue, green, orange, red } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const styles = {
  snackbarRoot: {
    display: 'flex',
    alignItems: 'center',
    width: '92%',
    maxWidth: 640,
    margin: 'auto'
  },
  snackBarContent: {
    width: '100%',
    wordBreak: 'break-word',
    flexWrap: 'nowrap'
  },
  message: {
    width: 'max-content'
  }
}
const STYLES_BY_NOTIFICATION_TYPE = {
  error: {
    backgroundColor: red[500]
  },
  success: {
    backgroundColor: green[500]
  },
  warning: {
    backgroundColor: orange[500]
  },
  info: {
    backgroundColor: blue[500]
  }
}

function Notification(props) {
  if (!process.browser) {
    return null
  }
  const [container] = useState(() => {
    // This will be executed only on the initial render
    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    return document.createElement('div')
  })
  let { message = '', type = 'error', show: showToast = true, onClose, autoHideDuration = 6000 } = props

  const closeToast = () => {
    onClose && onClose(true)
  }

  useEffect(() => {
    container.classList.add('sl-notification')
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return showToast
    ? ReactDOM.createPortal(
        <div>
          <Snackbar
            open={showToast}
            autoHideDuration={autoHideDuration}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={() => closeToast()}
            sx={{
              '&.MuiSnackbar-root': styles.snackbarRoot
            }}
          >
            <SnackbarContent
              sx={{
                '&.MuiSnackbarContent-root': { ...styles.snackBarContent, ...STYLES_BY_NOTIFICATION_TYPE[type] },
                '&.MuiSnackbarContent-message': styles.message
              }}
              message={'jkjhuhiubihbjh'}
              action={
                <IconButton size="small" color="inherit" onClick={closeToast}>
                  <Close fontSize="small" />
                </IconButton>
              }
            />
          </Snackbar>
        </div>,
        container
      )
    : null
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClose: PropTypes.func,
  autoHideDuration: PropTypes.number
}

export default Notification

import { Alert, Snackbar } from '@mui/material'
import * as React from 'react'

const ClientError = ({ errorCode, errorMessage, severity = 'error', hideErrorMessage }) => {
  const [showMessage, setShowMessage] = React.useState(true)
  const handleClose = () => {
    setShowMessage(false)
    hideErrorMessage()
  }
  return (
    <Snackbar
      open={showMessage}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ maxWidth: '100%', minWidth: 325 }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  )
}

export default ClientError

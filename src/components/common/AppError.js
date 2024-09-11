import { Alert, Box, Snackbar, Typography } from '@mui/material'
import * as React from 'react'
import NotFound from '../../../public/images/NotFound.svg'

const AppError = ({ errorCode, errorMessage, severity = 'error' }) => {
  const [showMessage, setShowMessage] = React.useState(true)
  const handleClose = () => {
    setShowMessage(false)
  }
  return (
    <Box
      height={'calc(100vh - 72px)'}
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ maxWidth: '100%', minWidth: 325 }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <NotFound style={{ height: '15rem' }}></NotFound>
    </Box>
  )
}

export default AppError

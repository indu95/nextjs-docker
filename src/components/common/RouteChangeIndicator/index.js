import { Backdrop, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function RouteChangeIndicator(props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const handleStart = (url) => {
      setLoading(true)
    }
    const handleComplete = (url) => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [])

  return (
    <>
      {loading && (
        <Backdrop open={loading} sx={{ zIndex: 999999 }}>
          <CircularProgress />
        </Backdrop>
      )}
    </>
  )
}

RouteChangeIndicator.propTypes = {}

RouteChangeIndicator.defaultProps = {}

export default RouteChangeIndicator

import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import PropTypes from 'prop-types'
import * as React from 'react'
import AppError from '../src/components/common/AppError'
import createEmotionCache from '../src/createEmotionCache'
import theme from '../src/theme'
import Layout from '../src/components/common/Layout'
import ClientError from '../src/components/common/ClientError'
import ClientErrorDisplayService from '../src/context/ClientErrorDisplayService'
import UserDataContext from '../src/context/UserContext'
import RouteChangeIndicator from '../src/components/common/RouteChangeIndicator'
import { useMemo } from 'react'
import { Container } from '@mui/material'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const { errorCode, errorMessage, userPermissions, currentPage } = pageProps
  const [error, setError] = React.useState({
    message: '',
    severity: 'error'
  })
  const hideErrorMessage = () => {
    setError({
      message: ''
    })
  }
  const showError = ({ message, severity = 'error' }) => {
    console.log(severity)
    setError({
      message,
      severity
    })
  }
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ClientErrorDisplayService.Provider
          value={useMemo(
            () => ({
              showError: showError
            }),
            []
          )}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <RouteChangeIndicator></RouteChangeIndicator>
          {Boolean(error.message) && (
            <ClientError
              errorMessage={error.message}
              severity={error?.severity}
              hideErrorMessage={hideErrorMessage}
            ></ClientError>
          )}
          <UserDataContext.Provider value={{ userPermissions }}>
            <Layout
              currentPage={currentPage}
              appBaseUrl={pageProps?.appBaseUrl}
              brand={pageProps?.brand}
              brandLogo={pageProps?.brandLogo}
              isLoggedIn={pageProps?.isLoggedIn}
            >
              {Boolean(errorCode) ? (
                <AppError errorCode={errorCode} errorMessage={errorMessage}></AppError>
              ) : (
                <Container
                  maxWidth="xl"
                  disableGutters={true}
                  sx={{
                    height: '100%',
                    overflow: 'auto'
                  }}
                >
                  <Component {...pageProps} />
                </Container>
              )}
            </Layout>
          </UserDataContext.Provider>
        </ClientErrorDisplayService.Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
}

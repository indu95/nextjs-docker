import React, { createContext, useContext, useState, useMemo } from 'react'
import Loader from '../components/common/Loader'
import Notification from '../components/common/Notification'

const CommonsContext = createContext()

// Wrap the component in the service provider
export const CommonsServiceProvider = ({ children }) => {
  const [notificationState, setNotificationState] = useState({ message: '', show: false, type: 'failure' })
  const [loaderState, setLoaderState] = useState(false)
  const hideNotification = () => {
    setNotificationState({ message: '', show: false, type: 'failure' })
  }
  const showNotification = (message, type) => {
    setNotificationState({ message, show: true, type })
  }
  const toggleLoader = (show) => {
    setLoaderState(show)
  }

  return (
    <React.Fragment>
      <CommonsContext.Provider
        value={useMemo(
          () => ({
            utils: {
              showNotification: showNotification,
              hideNotification: hideNotification,
              toggleLoader: toggleLoader
            }
          }),
          []
        )}
        children={children}
      />
      {notificationState.show && <Notification {...notificationState} onClose={hideNotification}></Notification>}
      {loaderState && <Loader show={loaderState} />}
    </React.Fragment>
  )
}
export const useCommons = () => useContext(CommonsContext)

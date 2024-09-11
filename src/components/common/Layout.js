// components/Layout.js
import dynamic from 'next/dynamic'
import React from 'react'
const Header = dynamic(() => import('./Header'), {
  ssr: false
})

function Layout(props) {
  const { appBaseUrl, brand, children, brandLogo, isLoggedIn = false, currentPage } = props
  return (
    <div className="mainLayout">
      <Header
        appBaseUrl={appBaseUrl}
        brand={brand}
        brandLogo={brandLogo}
        isLoggedIn={isLoggedIn}
        currentPage={currentPage}
        children={children}
      ></Header>
      {!isLoggedIn ? children : null}
    </div>
  )
}
export default Layout

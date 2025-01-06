import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import WalletAdapter from './components/WallatAdapter'



function Layout() {
    return (
        <>

        <div className=''>
            <div className='border-b border-gray-800'>
                <Header />
            </div>
        <WalletAdapter>
            <Outlet />
        </WalletAdapter>
        </div>
     
        </>
    )
}

export default Layout

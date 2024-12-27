import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import WalletAdapter from '../components/WallatAdapter';


function Layout() {
    return (
        <>
        <WalletAdapter >
        <div className='bg-black h-screen'>
            <div className='border-b border-gray-600'>
                <Header />
            </div>
            <Outlet />
        </div>
        </WalletAdapter>
        </>
    )
}

export default Layout

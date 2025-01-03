import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'



function Layout() {
    return (
        <>
        <div className='bg-black/95'>
            <div className='border-b border-gray-800'>
                <Header />
            </div>
            <Outlet />
        </div>
     
        </>
    )
}

export default Layout

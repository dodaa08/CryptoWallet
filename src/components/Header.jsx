import React from 'react'
import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { Link } from "react-router-dom"
function Header() {
   
    return (
        <>
        <div className='bg-black/95 flex justify-around text-white py-3'>            
            <div className='py-3'>
                <Link to="/">
                <h1 className='text-2xl'>Crypto Wallet</h1>
                </Link>
            </div>


            <div className='flex gap-10'>
                <div className='border-2 border-gray-800 py-3 px-4 rounded-xl hover:bg-gray-900 transition duration-200'>
                <button className='text-xl'>Swap</button>
                </div>
                <Link to="/launch">
                <div className='border-2 border-gray-800 py-3 px-4 rounded-xl hover:bg-gray-900 transition duration-200'>
                <button className='text-xl'>Launch Tokens</button>
                </div>
                </Link>
                <div className='border-2 border-gray-800 py-3 px-4 rounded-xl hover:bg-gray-900 transition duration-200'>
                <button className='text-xl'>Liquidity Pool</button>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default Header

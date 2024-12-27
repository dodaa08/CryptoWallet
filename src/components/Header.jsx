import React from 'react'
import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { Link } from "react-router-dom"
function Header() {
   
    return (
        <>
         <div className='flex flex-row justify-between h-full py-3  bg-black text-white '>
            <Link to=""> 
            <button>
  <div className='flex mt-5 ml-5 justify-between flex-row'>
        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/solana-crypto-wallet-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--cryptocurrency-app-coin-pack-business-illustrations-4229368.png?f=webp" alt="" className='rounded-xl h-12 mr-5  cursor-pointer '/>
        <h1 className='text-2xl  mt-2'>CryptoWallet</h1>
        </div>
            </button>
            </Link>
       
       
    

        <div className='flex justify-evenly gap-10 mr-10 py-2 '>
            <Link to="/swap">
            <button className='flex gap-2 bg-blue-400 rounded-xl py-1 px-5 text-black mt-2 font-mono hover:bg-blue-300 transition duration-200' >
            <h1 className='text-xl mt-1'>Swap</h1>
            <ArrowLeftRight className='mt-1'/>
            </button>
            </Link>
            <Link to="/launch">
            <button className=''>
            <h1 className='text-xl  mt-2 font-mono'>Launch MemeCoin</h1>
            </button>
            </Link>
        </div>
          </div>
        </>
    )
}

export default Header

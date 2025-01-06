import React from 'react'
import '@solana/wallet-adapter-react-ui/styles.css';
import { Link } from 'react-router-dom';


function Landing() {
    return (
     <>
     <div className='bg-black/95 flex flex-col space-y-10 text-white h-screen'>
      
      <div className='flex justify-center py-20 '>
        <h1 className='text-xl font-mono border-b border-gray-700'>Setup your Solana wallet with devnet mode to access all features</h1>
      </div>
    
    <div className='flex justify-around'>
      <div>
        <Link to="new">
        <button className='border-2 border-pink-800 py-2 px-5 rounded-xl hover:bg-gray-800 transiiton duration-200 text-xl' >Create Wallet</button>
        </Link>
        </div>
      <div>
        <Link to="import">
        <button className='border-2 border-blue-800 py-2 px-5 rounded-xl hover:bg-gray-800 transiiton duration-200 text-xl' >Import Wallet</button>
        </Link>
        </div>
    </div>
    
    </div>      
     </>   
    )
}

export default Landing






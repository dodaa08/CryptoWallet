import React from 'react'
import '@solana/wallet-adapter-react-ui/styles.css';
import { Link } from 'react-router-dom';


function Landing() {
    return (
     <>
     <div className='flex flex-col space-y-10 text-white h-screen'>
      
      <div className='flex justify-center py-20 '>
        <h1 className='text-xl font-mono border-b border-gray-700'>Learn Basics of Crypto by playing with this Website..</h1>
      </div>
    
    <div className='flex justify-around'>
      <div>
        <Link to="new">
        <button className='border-2 border-pink-800 py-2 px-5 rounded-xl hover:bg-gray-800 transiiton duration-200 text-l' >Create Wallet</button>
        </Link>
        </div>
      <div>
        <Link to="import">
        <button className='border-2 border-blue-800 py-2 px-5 rounded-xl hover:bg-gray-800 transiiton duration-200 text-l' >Import Wallet</button>
        </Link>
        </div>
    </div>
    
    </div>      
     </>   
    )
}

export default Landing






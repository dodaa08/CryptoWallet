import React from 'react'
import '@solana/wallet-adapter-react-ui/styles.css';
import { Link } from 'react-router-dom';


function Landing() {
    return (
     <>
 
     <div className="text-center">

            <div className='py-10'>
            <p className="text-lg md:text-2xl mt-6 text-balance text-gray-300 fade-in delay-2">
                Making the onboarding process easy and simple
            </p>
          </div>
            </div>
        

          <div className='align-center items-center flex flex-row justify-center justify-evenly py-20'>
            <Link to="/new">
              <button className='bg-gray-800 text-white text-2xl rounded-xl py-3 px-4  hover:bg-gray-600 transition duration-200'>New Wallet</button>
            </Link>
            
            <Link to="/import">
              <button  className='bg-gray-800 text-white text-2xl rounded-xl py-3 px-4  hover:bg-gray-600 transitsition duration-200'>Import Wallet</button>
            </Link>
          </div>
      
     </>   
    )
}

export default Landing






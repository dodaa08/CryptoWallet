import React, { useEffect, useRef, useState } from 'react'

function Swap() {
    const amount = useRef(0);
    const [convertedAmount, setconvertedAmount] = useState();
    const [fromC, setfromC] = useState("BTC");
    const [toC, settoC] = useState("Solana");
    const currencies = [
        {
            crypto: "BTC",
            value: 1  // 1 BTC = 1 BTC (for self-reference in swaps)
        },
        {
            crypto: "Eth",
            value: 1 / 13.26  // 1 ETH = 13.26 SOL => 1 ETH ≈ 0.075 SOL (1 / 13.26)
        },
        {
            crypto: "Solana",
            value: 1 / 467.70  // 1 BTC = 467.70 SOL => 1 SOL ≈ 0.00214 BTC
        },
        {
            crypto: 'USDC',
            value: 1 / 1  // 1 USDC = 1 SOL (fixed for 1:1 ratio)
        }
    ];
    


    const handleAmount = ()=>{
        const from =  currencies.find(e=>e.crypto == fromC);
        const to = currencies.find(e=>e.crypto == toC);
        if(from && to){
            const result = (amount.current.value*from.value) /to.value;
            setconvertedAmount(result);
        }
    }

    const swap = ()=>{
        alert("on it, will be out soon!");
    }



    return (
     <>
      <div className='bg-black/95 h-max'>
        <div className='h-screen'>
            <div className="flex justify-center gap-96  mb-5">
                <div className='text-2xl mb-2'><h1 className='text-white'>Swap your assets here</h1></div>

            </div>
              <div className='flex justify-center  gap-10'>
                <div className='flex flex-col text-white border-2 py-20 px-20 gap-6 rounded-xl bg-black border-gray-900'>
                <input ref={amount} onChange={handleAmount} type="number" placeholder='Amount : ' className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500'/>
                <select className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500' value={fromC}  onChange={(e)=>setfromC(e.target.value)}>

                   {
                       currencies.map((crypto, index)=>(
                           <option key={index} value={crypto.crypto}>{crypto.crypto}</option>
                        ))
                    }
                   
                    </select>
                    <div className='flex justify-center re'>
                        <h1>to</h1>
                    </div>
                    <select  value={toC} onChange={(e)=>settoC(e.target.value)} className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500'>
                    {
                        currencies.map((crypto, index)=>(
                            <option key={index} value={crypto.crypto}>{crypto.crypto}</option>
                        ))
                    }
                    </select>
                    <div>
                    <input type="text" placeholder='Converted Amount : ' readOnly   value={convertedAmount} className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500'/>
                    </div>
                    
                <div className='flex justify-center '><button className='bg-purple-400 text-black rounded-xl py-2 px-10 hover:bg-purple-500 transition duration-200' onClick={swap}>Swap</button></div>
                </div>

              </div>
        </div>
        </div>
     </>   
    )
}

export default Swap

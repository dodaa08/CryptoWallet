import { Keypair } from '@solana/web3.js';  
import { Connection, clusterApiUrl } from '@solana/web3.js';

import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useRef } from 'react';

import { Transaction, SystemProgram } from '@solana/web3.js';


function Airdrop (){
    const amount = useRef(0);
    const wallet = Keypair.generate();
    const publickey = "FpBho3VQy2kcCLAyG5vFM14pMdpnieJvA6XAeJJbNoLf";
    console.log('Public Key:', wallet.publicKey.toString());
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    
    
    const air = async ()=>{
        const airdropAmount = Number(amount.current.value) * LAMPORTS_PER_SOL;
        const airdropSignature = await connection.requestAirdrop(
            wallet.publicKey,
            airdropAmount// Amount of SOL to send
        );
        
        await connection.confirmTransaction(airdropSignature);
        console.log('Airdrop successful');
        const transferAmount = Number(amount.current.value) * LAMPORTS_PER_SOL;
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: publickey, // The provider's public key
                lamports: transferAmount
            })
  );
  
  // Send the transaction
  const txSignature = await connection.sendTransaction(transaction, [wallet]);
  
  await connection.confirmTransaction(txSignature);
  console.log('Transaction confirmed:', txSignature);
}
    return (
        <>
        <div className='bg-black/95 h-max'>
        <div className='h-screen'>
            <div className="flex justify-center gap-96 mt-12 mb-5">
                <div className='text-2xl mb-2'><h1 className='text-white'>AirDrop Sol </h1></div>
                <div className='text-2xl mb-2'><h1 className='text-white'>Send Crypto </h1></div>

            </div>
              <div className='flex justify-center  gap-10'>
                <div className='flex flex-col text-white border-2 py-20 px-20 gap-6 rounded-xl bg-black border-gray-900'>
                <input type="number"  ref={amount}  placeholder='Amount : ' className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500'/>
                <div className='flex justify-center '><button className='bg-purple-400 text-black rounded-xl py-2 px-10 hover:bg-purple-500 transition duration-200' onClick={air}>Get</button></div>
                </div>

                <div className='flex flex-col text-white border-2 py-20 px-20 gap-6 rounded-xl bg-black border-gray-900'>
                <input type="text" placeholder='Address : ' className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500'/>
                <input type="number" placeholder='Amount : ' className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500'/>
                <div className='flex justify-center '><button className='bg-purple-400 text-black rounded-xl py-2 px-10 hover:bg-purple-500 transition duration-200'>Send</button></div>
                </div>  
              </div>
        </div>
        </div>
        </>
    )
}

export default Airdrop;

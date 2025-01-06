import React, { useState } from 'react';
import nacl from 'tweetnacl';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { Buffer } from 'buffer';
import * as bip39 from 'bip39';
import base58 from 'bs58';
import { Copy } from 'lucide-react';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { BadgePlus } from 'lucide-react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { Link } from "react-router-dom"
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');




window.Buffer = window.Buffer || Buffer;

function NewWallet() {
  const [wallets, setWallets] = useState([]);
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [walletNo, setWalletNo] = useState(1); // Wallet number
  const [balance, setBalance] = useState(0); // Wallet balance
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showadd, setshowadd] = useState(false);


  const showkeys = ()=>{
    setShowPrivateKey(()=>!showPrivateKey);
  }

  // Generate a new mnemonic
  const createMnemonic = async () => {
    try {
      const newMnemonic = await generateMnemonic();
      setMnemonic(newMnemonic);
      setPublicKey('');
      setPrivateKey('');
      await generateKeys(newMnemonic);      
    } catch (error) {
      console.error('Error generating mnemonic:', error);
      alert('Failed to generate a new mnemonic.');
    }
  };


  // create wallet

  const generateKeys = async (mnemonic) => {
    try {
      // Generate seed from mnemonic
      const seed = bip39.mnemonicToSeedSync(mnemonic, ''); // No passphrase
  
      // Derive keypair using the first 32 bytes of the seed
      const keypair = Keypair.fromSeed(seed.slice(0, 32));
  
      // Fetch balance (assuming connection is defined elsewhere)
      const publicKey = keypair.publicKey.toString();
      const balance = await connection.getBalance(new PublicKey(publicKey));
  
      // Update states
      await setPublicKey(publicKey);
      await setPrivateKey(base58.encode(keypair.secretKey));
      await setWalletNo((prevWalletNo) => prevWalletNo + 1);
      await setBalance(balance / 1e9); // Convert lamports to SOL
      setshowadd(true);
      await AddWallets();
    } catch (error) {
      console.error("Error generating keys:", error);
    }
  };


  const AddWallets = async ()=>{
    const seed = bip39.mnemonicToSeedSync(mnemonic, ''); // No passphrase
  
    // Derive keypair using the first 32 bytes of the seed
    const keypair = Keypair.fromSeed(seed.slice(0, 32));
    const publicKey = keypair.publicKey.toString();
    setWalletNo(()=>walletNo+1);
    // Add the wallet to the wallets array
    await setWallets((prevWallets) => [
      ...prevWallets,
      {
        balance: balance / 1e9, // In SOL
        walletNo: walletNo,
        publicKey,
        privateKey: base58.encode(keypair.secretKey),
      },
      
    ]);
  }

// fix the warnings and erorrs.


const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('Copied to clipboard!');
    })
    .catch((err) => {
      console.error('Error copying to clipboard:', err);
      alert('Failed to copy.');
    });
};



  

  return (
    <>
    <div className='h-screen bg-black text-white'>

    <div className='flex flex-col bg-black'>

      <div className='flex justify-center py-10'>
        <h1 className='text-2xl'>Secret Recovery Phrase..</h1>
      </div>

      <div className='flex justify-center'>
        <button className='bg-blue-400 rounded-l py-2 px-5 text-xl text-black hover:border-gray-800 border-2 border-gray-500 transition duration-400' onClick={createMnemonic}>Generate Seed Phrase</button>
      </div>

      {
        mnemonic && 
        <div className='flex justify-center py-10'>
       <div className="border-2 py-3 px-10 border-gray-800 ">
  <h1 className="mb-4 text-lg font-semibold">Your Seed Phrase:</h1>
  <div className="grid grid-cols-3 gap-4">
    {mnemonic.split(" ").map((word, index) => (
      <div
      key={index}
      className="border-2 border-gray-800 p-2 text-center rounded-lg"
      >
        {word}
      </div>
    ))}
    <div className=''><button onClick={()=>copyToClipboard(mnemonic)}><Copy/></button></div>
  </div>
</div>

      </div>
      }

    
      <div className='flex justify-center gap-5'>
      
      <div className='space-y-10 mb-5'>
        {
          wallets &&
          wallets.map((wallet, index)=>(
            <div key={index} className='flex justify-center ml-2  text-white text-2xl border-2 border-gray-800 rounded-l w-max py-2 px-5 '>
                 <div className='flex flex-col'>
                  <div className='py-2 '>
                  <h1 className='ml-10 border-2 border-gray-700 rounded-full py-1 px-5 w-max '>{wallet.walletNo}</h1>
                  </div>
                  <div className='py-2 flex flex-col'>
                  <h1 className='text-center'>{wallet.balance} Sol</h1>
                  <div className='flex justify-center gap-5 py-5'>
                    <Link to="/air">
                    <button className='border-2 border-gray-800 rounded-xl py-2 px-5 hover:bg-gray-900 transition duration-200' >Send</button>
                    </Link>
                    <Link to="/swap">
                    <button className='border-2 border-gray-800 rounded-xl py-2 px-5 hover:bg-gray-900 transition duration-200' >Swap</button>
                    </Link>
                  </div>
                  </div>
                  <div className='flex gap-10 '>
                  <h1 className='text-center'>{wallet.publicKey}</h1>
                  <div className=''><button onClick={()=>copyToClipboard(publicKey)}><Copy/></button></div>
                  </div>
                 
                  
                  {
                    showPrivateKey ?  
                    <>
                    <h1 className='text-center'>Private Key:</h1>
                     <div className='flex justify-center gap-10'>
                    <h1 className='text-center'>{wallet.privateKey}</h1>
                    <button>
                    <EyeOff onClick={showkeys}/>
                    </button>
                     </div>
                     </>
                    :
                    <>
                    <div className='flex justify-center gap-10'>
                      ...................................
                      <button>
                    <Eye onClick={showkeys}/>
                    </button>
                    </div>
                    </>
                  }
                 </div>
             </div>
          ))
        }
        </div>
        <div>{showadd && <>
        <div className=''>
           <button onClick={AddWallets}>
            <BadgePlus />
            </button> 
           <h1 className='text-l'>Add Wallet</h1>
        </div>
        </>}</div>
    </div>
    
      </div>
        </div>
    </>
      
  );
}

export default NewWallet;

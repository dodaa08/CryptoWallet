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


window.Buffer = window.Buffer || Buffer;

function NewWallet() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [walletNo, setWalletNo] = useState(0); // Wallet number
  const [balance, setBalance] = useState(0); // Wallet balance
  const [showPrivateKey, setShowPrivateKey] = useState(false);

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

  const generateKeys = async (mnemonic) => {
    const seed = bip39.mnemonicToSeedSync(mnemonic, '');
    const keypair = Keypair.fromSeed(seed.slice(0, 32));
    setPublicKey(keypair.publicKey.toString());
    setPrivateKey(base58.encode(keypair.secretKey));
    setWalletNo(walletNo + 1);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(privateKey)
      .then(() => {
        alert('Private key copied to clipboard!');
      })
      .catch(err => {
        console.error('Error copying to clipboard:', err);
        alert('Failed to copy private key.');
      });
  };


  

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="contentBox text-center">
          <h2 className="text-2xl mb-4">Secret Recovery Phrase</h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 mb-6"
            onClick={createMnemonic}
          >
            Generate New Mnemonic
          </button>

          {mnemonic && (
            <div className="text-white">
              <p>{mnemonic}</p>
              <div className="flex justify-evenly align-center items-center">
                <div className="flex flex-col items-center">
                  {publicKey && (
                    <>
                      <div className='flex '>
                            

                      <div className="py-5">
                        <div className="py-2 ">
                          <h1 className="text-2xl font-mono">Wallet {walletNo}</h1>
                        </div>
                        <div className="border-gray-700 border-2 rounded-xl py-1 px-10">
                          <p>Public Key</p>
                          <p className="py-2 break-all">{publicKey}</p>

                          <div className="py-8">
                            <h1 className="text-2xl">{balance}.00</h1>
                          </div>

                          <div className="flex justify-center gap-10">
                            <button className="bg-blue-400 rounded-xl py-2 px-5 text-black border-2 border-gray-500 hover:bg-blue-500 transition duration-600">Send</button>
                            <button className="bg-blue-400 rounded-xl py-2 px-5 text-black border-2 border-gray-500 hover:bg-blue-500 transition duration-600">Receive</button>
                            <button className="bg-blue-400 rounded-xl py-2 px-5 text-black border-2 border-gray-500 hover:bg-blue-500 transition duration-600">Sell</button>
                          </div>

                          <div className="flex flex-col items-center mt-4">
  <h1 className="text-xl font-mono">Private Key</h1>
  <div className="rounded p-2 h-16">
    {showPrivateKey ? (
      <p className="break-all">{privateKey}</p>
    ) : (
      <p className="break-all">****************</p>
    )}
  </div>
</div>

<div className="flex justify-center gap-10">
  <button
    className="text-white py-2 px-4"
    onClick={copyToClipboard}
  >
    <Copy />
  </button>
  <button
    onClick={() => setShowPrivateKey((prevState) => !prevState)}
    className="hover:scale-110 transition duration-200"
  >
    {showPrivateKey ? <EyeOff /> : <Eye />}
  </button>
</div>
                        </div>
                      </div>

                      <div className='ml-20 flex justify-center'>
                        <button className=''>
                        <h1 className='text-2xl'>Add a wallet</h1>
                      <BadgePlus className='hover:scale-110 transition duration-300 mt-2'/>
                        </button>
                      </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewWallet;

import React, { useState } from 'react';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Buffer } from 'buffer';
import { validateMnemonic } from 'bip39';

// Add the global polyfill
window.Buffer = window.Buffer || Buffer;

function ImportWallet() {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [mnemonic, setMnemonic] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const generateKeys = () => {
    if (!mnemonic.trim()) {
      alert('Please enter a valid mnemonic seed phrase.');
      return;
    }

    if (!validateMnemonic(mnemonic)) {
      alert('Invalid mnemonic phrase.');
      return;
    }

    try {
      // Step 1: Generate seed from the mnemonic (12-word seed)
      const seed = mnemonicToSeedSync(mnemonic);
      const seedHex = seed.toString('hex');

      // Step 2: Derive 32-byte seed using the derivation path
      const path = `m/44'/501'/0'/0'`; // Solana derivation path
      const derivedSeed = derivePath(path, seedHex).key;

      // Ensure the derived seed is 32 bytes
      if (derivedSeed.length !== 32) {
        console.error('Invalid derived seed length:', derivedSeed.length);
        alert('Derived seed is not 32 bytes.');
        return;
      }

      // Step 3: Generate Solana keypair from the derived seed
      const keypair = Keypair.fromSeed(derivedSeed);
      setPublicKey(keypair.publicKey.toString());
      setPrivateKey(Buffer.from(keypair.secretKey).toString('hex'));
    } catch (error) {
      console.error('Error generating keys:', error);
      alert('Error generating keys. Please check your mnemonic or try again.');
    }
  };

  const toggleShowPrivateKey = () => setShowPrivateKey(!showPrivateKey);

  return (
    <div className='bg-black/95 h-max text-white'>
      <div className='h-screen flex justify-center '>
        <div className='flex flex-col py-20 '>
          <div>
            <h1 className='text-2xl'>Enter Seed Phrase</h1>
          </div>
          <div className='py-10'>
            <input
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
              type="text"
              placeholder='Seed Phrase'
              className='bg-black/95 py-3 w-96 px-5 rounded-l'
            />
          </div>
          <div className='flex justify-center'>
            <button
              onClick={generateKeys}
              className='border-2 py-2 px-5 rounded-xl border-gray-700 hover:bg-gray-800 transition duration-200'
            >
              Import
            </button>
          </div>
        </div>
      </div>

      <div className='px-10'>
        {publicKey && (
          <div>
            <h2 className='text-xl'>Public Key:</h2>
            <p className='text-sm'>{publicKey}</p>
          </div>
        )}
        {privateKey && (
          <div>
            <h2 className='text-xl'>Private Key:</h2>
            <p className='text-sm'>
              {showPrivateKey ? privateKey : '********'}
              <button onClick={toggleShowPrivateKey} className='ml-2'>
                {showPrivateKey ? <FaEyeSlash /> : <FaEye />}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImportWallet;

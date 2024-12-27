import React, { useState } from 'react';
import nacl from 'tweetnacl';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Buffer } from 'buffer';
// Add the global polyfill
window.Buffer = window.Buffer || Buffer;

function ImportWallet() {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [mnemonic, setMnemonic] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  // Generate a new mnemonic phrase
 

  // Generate keys based on mnemonic
  const generateKeys = () => {
    if (!mnemonic.trim()) {
      alert('Please enter or generate a mnemonic seed phrase.');
      return;
    }
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/501'/0'/0'`; // Solana's derivation path
      const derivedSeed = derivePath(path, seed.toString('hex')).key;

      const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
      const keypair = Keypair.fromSecretKey(keyPair.secretKey);

      setPublicKey(keypair.publicKey.toBase58());
      setPrivateKey(Buffer.from(keyPair.secretKey).toString('hex'));
    } catch (error) {
      console.error('Error generating keys:', error);
      alert('Invalid mnemonic or error generating keys.');
    }
  };

  const toggleShowPrivateKey = () => setShowPrivateKey(!showPrivateKey);

  return (
    <div className={`bg-black text-white  h-screen`}>
    

      <main className="contentBox text-center ">
        <h2 className="text-4xl font-bold mb-8">Secret Recovery Phrase</h2>
        <div className="flex justify-center gap-4 mb-8">
          <input
            type="text"
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
            placeholder="Enter or generate seed phrase..."
            className="w-1/2 p-3 rounded bg-gray-200 dark:bg-gray-800"
          />
          <button
            onClick={generateKeys}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
          >
            Add wallet
          </button>
        </div>

        {publicKey && privateKey && (
          <div className="flex flex-col items-center">
            <div className="bg-gray-800 text-white p-5 rounded shadow w-4/5 mb-4">
              <h3 className="text-2xl mb-2">Public Key</h3>
              <p className="break-all">{publicKey}</p>
            </div>
            <div className="bg-gray-800 text-white p-5 rounded shadow w-4/5 relative">
              <h3 className="text-2xl mb-2">Private Key</h3>
              <p className="break-all">
                {showPrivateKey ? privateKey : '••••••••••••••••••••••••••••••••••••••••••'}
              </p>
              <button
                onClick={toggleShowPrivateKey}
                className="absolute top-4 right-4 text-2xl"
              >
                {showPrivateKey ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ImportWallet;

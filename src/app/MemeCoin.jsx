import React from 'react'
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_2022_PROGRAM_ID, createMintToInstruction, createAssociatedTokenAccountInstruction, getMintLen, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, TYPE_SIZE, LENGTH_SIZE, ExtensionType, getAssociatedTokenAddressSync } from "@solana/spl-token"
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { useState } from "react";
import WalletAdapter from '../components/WallatAdapter';
window.Buffer = Buffer;


function MemeCoin() {
    const [name , setName] = useState('');
    const [symbol , setSymbol] = useState('');
    const [image , setImage] = useState('');
    const [supply , setSupply] = useState('');

    const { connection } = useConnection();
    const wallet = useWallet();

    async function createToken() {
       if(name == '' || symbol == '' || image == '' || supply == '') {
          alert("Fill the data first!");
          return;
       }
        const mintKeypair = Keypair.generate();
        const metadata = {
            mint: mintKeypair.publicKey,
            name: name,
            symbol: symbol,
            uri: image,
            additionalMetadata: [],
        };
        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: mintLen,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
            createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mintKeypair.publicKey,
                metadata: mintKeypair.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: wallet.publicKey,
                updateAuthority: wallet.publicKey,
            }),
        );
            
        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        await wallet.sendTransaction(transaction, connection);

        console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
        const associatedToken = getAssociatedTokenAddressSync(
            mintKeypair.publicKey,
            wallet.publicKey,
            false,
            TOKEN_2022_PROGRAM_ID,
        );

        console.log(associatedToken.toBase58());

        const transaction2 = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedToken,
                wallet.publicKey,
                mintKeypair.publicKey,
                TOKEN_2022_PROGRAM_ID,
            ),
        );

        await wallet.sendTransaction(transaction2, connection);

        const transaction3 = new Transaction().add(
            createMintToInstruction(mintKeypair.publicKey, associatedToken, wallet.publicKey, 1000000000, [], TOKEN_2022_PROGRAM_ID)
        );

        await wallet.sendTransaction(transaction3, connection);

        console.log("Minted!");
    }

    return (
      

        <>
        <div className='bg-black/95 h-max'>
        <div className='h-screen'>
                <div className='flex justify-center text-2xl mb-2'><h1 className='text-white'>Launch Tokens </h1></div>
              <div className='flex justify-center '>
                <div className='flex flex-col text-white border-2 py-20 px-20 gap-6 rounded-xl bg-black border-gray-900'>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Token Name : ' className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500'/>
                <input value={symbol} onChange={(e)=>setSymbol(e.target.value)} type="text" placeholder='Symbol Text : ' className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500'/>
                <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" placeholder='Image URL : ' className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500'/>
                <input value={supply} onChange={(e)=>setSupply(e.target.value)} type="text" placeholder='Supply Number : ' className='py-2 w-72 px-5 rounded-xl bg-black border-2 border-gray-500'/>
                <div className='flex justify-center '><button className='bg-purple-400 text-black rounded-xl py-2 px-10 hover:bg-purple-500 transition duration-200' onClick={createToken}>Create</button></div>
                </div>
              </div>
        </div>
        </div>
        </>
        
    )
}

export default MemeCoin

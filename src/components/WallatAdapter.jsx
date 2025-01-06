

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import MemeCoin from '../app/MemeCoin';


export default function WalletAdapter({children}) {
    return (
      <div className='bg-black'>
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 20
                }}>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
                {children}
              </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    )
  }
  
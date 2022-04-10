import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import Confirmed from './components/Confirmed';

const App = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log('👋 Address:', address);

  // Initialize the editionDrop contract
  const editionDrop = useEditionDrop(
    '0x8514E0658699Be7C6c73Cc7f7B173357BDF36604'
  );
  // state variable to know if user has our nft
  const [hasNFT, setHasNFT] = useState(false);

  useEffect(() => {
    // if they don't have connected wallet, exit
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);

        if (balance.gt(0)) {
          setHasNFT(true);
          console.log('🎫 This user has a membership NFT');
        } else {
          setHasNFT(false);
          console.log('🚨 This user does not have a membership NFT');
        }
      } catch (err) {
        setHasNFT(false);
        console.log('❌ Failed to get balance', err);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to MyDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  return (
    <div className="landing">
      <h1>wallet connected!</h1>
      <Confirmed />
    </div>
  );
};

export default App;

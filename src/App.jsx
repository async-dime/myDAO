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
    '0x95d12CBe32b6442BB278534b0D390002F4d2a888'
  );
  // state variable to know if user has our nft
  const [hasNFT, setHasNFT] = useState(false);
  // isClaiming lets us easily keep a loading state while the nft is minting
  const [isClaiming, setIsClaiming] = useState(false);

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
          console.log('🪖 This warrior has a Pledge for Everydays NFT');
        } else {
          setHasNFT(false);
          console.log('🗿 This user does not have a Pledge for Everydays NFT, yet');
        }
      } catch (err) {
        setHasNFT(false);
        console.error('❌ Failed to get balance', err);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim('0', 1);
      console.log(
        `✔️ NFT Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
      );
      setHasNFT(true);
    } catch (err) {
      setHasNFT(false);
      console.error('❌ Failed to mint NFT', err);
    } finally {
      setIsClaiming(false);
    }
  };

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

  if (hasNFT) {
    return (
      <div className="member-page">
        <h1>You are a member of MyDAO!</h1>
        <Confirmed />
      </div>
    );
  }

  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  return (
    <div className="mint-nft">
      <h1>Mint</h1>
      <h1>♔ Pledge for Everydays ♔</h1>
      <button disabled={isClaiming} onClick={mintNft}>
        {isClaiming ? 'Minting...' : 'Mint ♔ Pledge for Everydays ♔ NFT (free)'}
      </button>
    </div>
  );
};

export default App;

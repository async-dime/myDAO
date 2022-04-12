import {
  useAddress,
  useMetamask,
  useEditionDrop,
  useToken,
} from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';
import Confirmed from './components/Confirmed';

const App = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log('👋 Address:', address);

  // Initialize the ERC-1155 MyDAO Obelisk Chamber Edition Drop contract
  const editionDrop = useEditionDrop(
    '0x95d12CBe32b6442BB278534b0D390002F4d2a888'
  );
  // Initialize the ERC-20 MyDAO Ultima Token contract
  const token = useToken('0x0Ca930033857Da238C4cF518Bb2e58F23d2178b6');
  // state variable to know if user has our nft
  const [hasNFT, setHasNFT] = useState(false);
  // isClaiming lets us easily keep a loading state while the nft is minting
  const [isClaiming, setIsClaiming] = useState(false);
  // Holds the amount of token each member has in state
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  // The array holding all of our members addresses
  const [memberAddresses, setMemberAddresses] = useState([]);

  // shortening wallet address
  const shortenAddress = (str) => {
    return str.substring(0, 6) + '...' + str.substring(str.length - 4);
  };

  // Grabs the addresses of our members holding NFT
  useEffect(() => {
    if (!hasNFT) {
      return;
    }

    // Just like we did in the 7-airdrop-token.js file, grab the users who had our nft
    // with tokenId 0
    const getAllAddresses = async () => {
      try {
        const memberAddresses =
          await editionDrop.history.getAllClaimerAddresses(0);
        setMemberAddresses(memberAddresses);
        console.log('🕯️ Member Addresses:', memberAddresses);
      } catch (err) {
        console.error('❌ Failed to get member list', err);
      }
    };
    getAllAddresses();
  }, [hasNFT, editionDrop.history]);

  useEffect(() => {
    if (!hasNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log('👛 Amounts', amounts);
      } catch (err) {
        console.error('❌ Failed to get member balances', err);
      }
    };
    getAllBalances();
  }, [hasNFT, token.history]);

  // Combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      // Checking if we find the address in the memberTokenAmounts array
      // if yes, return amount the user has
      // if no, return 0
      const member = memberTokenAmounts?.find(
        ({ holder }) => holder === address
      );

      return {
        address,
        tokenAmount: member?.balance.displayValue || '0',
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

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
          console.log(
            '🗿 This user does not have a Pledge for Everydays NFT, yet'
          );
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

  // If the user has already claimed the nft we want to display the internal DAO page to them
  // only DAO members will see this. Render all the members + token amounts
  if (hasNFT) {
    return (
      <div className="member-page">
        <h1 className="">Hi, from MyDAO.</h1>
        <Confirmed />
        <div>
          <div>
            <h2>Member List</h2>
            <table className="card">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Token Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
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
